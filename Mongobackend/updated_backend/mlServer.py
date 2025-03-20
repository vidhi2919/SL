# from fastapi import FastAPI
# import joblib
# import numpy as np
# from pydantic import BaseModel
# from pymongo import MongoClient
# import os

# # Load ML Model
# model_path = os.path.join(os.path.dirname(__file__), "xgb_model.pkl")
# model = joblib.load(model_path) 

# # FastAPI App
# app = FastAPI()

# # MongoDB Connection
# MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://aroravidhi342:d615cAVlM5MnM5l2@cluster0.gzo5b.mongodb.net/loan_db?retryWrites=true&w=majority")
# client = MongoClient(MONGO_URI)
# db = client["smartlend"]

# # Request Body Schema (Only 15 features)
# class LoanRequest(BaseModel):
#     age: int
#     income: float
#     loanAmount: float
#     creditScore: int
#     monthsEmployed: int
#     numCreditLines: int
#     interestRate: float
#     loanTerm: int
#     dtiRatio: float
#     education_Bachelors: int
#     education_Masters: int
#     education_Doctorate: int
#     employment_SelfEmployed: int
#     employment_Unemployed: int
#     marital_Married: int
#     marital_Divorced: int
#     marital_Widowed: int
#     hasMortgage: int
#     hasDependents: int
#     hasCosigner: int


# # **API Route to Predict Loan Approval**
# @app.post("/predict-loan")
# def predict_loan(data: LoanRequest):
#     try:
#         # Debugging: Print the raw input data
#         print("Received data:", data)

#         input_data = np.array([
#             data.age, data.income, data.loanAmount, data.creditScore,
#             data.monthsEmployed, data.numCreditLines, data.interestRate,
#             data.loanTerm, data.dtiRatio,
#             data.education_Bachelors, data.education_Masters, data.education_Doctorate, 
#             data.employment_SelfEmployed, data.employment_Unemployed,
#             data.marital_Married, data.marital_Divorced, data.marital_Widowed,
#             data.hasMortgage, data.hasDependents, data.hasCosigner
#         ]).reshape(1, -1)

#         print("Model expects features:", model.feature_names_in_)

#         # Predict
#         prediction = model.predict(input_data)[0]
#         return {"approved": int(prediction)}

#     except Exception as e:
#         return {"error": f"Prediction error: {str(e)}"}

# # **Run Server**
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)

from fastapi import FastAPI, HTTPException
import joblib
import numpy as np
from pydantic import BaseModel
from pymongo import MongoClient
import os
from fastapi.middleware.cors import CORSMiddleware
import logging

# Setup logging to file for detailed errors
logging.basicConfig(
    filename="app_error.log",
    level=logging.ERROR,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

# Load ML Model
model_path = os.path.join(os.path.dirname(__file__), "xgb_model.pkl")
try:
    model = joblib.load(model_path)
    print("Model loaded successfully!")
except Exception as e:
    logging.error(f"Error loading model: {str(e)}", exc_info=True)
    raise Exception(f"Failed to load model: {str(e)}")

# FastAPI App
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change to specific origins if needed)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (POST, GET, OPTIONS, etc.)
    allow_headers=["*"],
)

# MongoDB Connection
MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb+srv://aroravidhi342:d615cAVlM5MnM5l2@cluster0.gzo5b.mongodb.net/loan_db?retryWrites=true&w=majority",
)
try:
    client = MongoClient(MONGO_URI)
    db = client["loan_db"]
    print("MongoDB connected successfully!")
except Exception as e:
    logging.error(f"Error connecting to MongoDB: {str(e)}", exc_info=True)
    raise Exception(f"Failed to connect to MongoDB: {str(e)}")

# Request Body Schema (Including name, email, phoneNumber)
class LoanRequest(BaseModel):
    name: str
    email: str
    phoneNumber: str
    age: int
    income: float
    loanAmount: float
    creditScore: int
    monthsEmployed: int
    numCreditLines: int
    interestRate: float
    dtiRatio: float
    education: str
    employmentType: str
    maritalStatus: str
    hasMortgage: int
    hasDependents: int
    loanPurpose: str
    hasCoSigner: int


# **API Route to Predict Loan Approval**
@app.post("/predict-loan")
def predict_loan(data: LoanRequest):
    try:
        # Debugging: Print the raw input data
        print("Received data:", data.dict())

        # Prepare input data for the ML model (excluding name, email, phoneNumber)
        education_mapping = {
            "Bachelors": 1,
            "Masters": 2,
            "Doctorate": 3,
            "Others": 0,
        }

        employment_mapping = {
            "Salaried": 1,
            "SelfEmployed": 2,
            "Unemployed": 3,
            "Others": 0,
        }

        marital_mapping = {
            "Married": 1,
            "Divorced": 2,
            "Widowed": 3,
            "Single": 0,
        }

        loan_purpose_mapping = {
            "Home": 1,
            "Car": 2,
            "Education": 3,
            "Business": 4,
            "Others": 0,
        }

        # Convert categorical data to numerical
        input_data = np.array(
            [
                data.age,
                data.income,
                data.loanAmount,
                data.creditScore,
                data.monthsEmployed,
                data.numCreditLines,
                data.interestRate,
                data.dtiRatio,
                education_mapping.get(data.education, 0),
                employment_mapping.get(data.employmentType, 0),
                marital_mapping.get(data.maritalStatus, 0),
                data.hasMortgage,
                data.hasDependents,
                loan_purpose_mapping.get(data.loanPurpose, 0),
                data.hasCoSigner,
            ]
        ).reshape(1, -1)

        # Optional: Print model feature names for debugging
        print("Model expects features:", model.feature_names_in_)

        # Predict using the ML model
        prediction = model.predict(input_data)[0]

        # Store all data + prediction in MongoDB
        loan_record = data.dict()
        loan_record["approved"] = int(prediction)
        db.borrowers.insert_one(loan_record)

        return {
            "name": data.name,
            "approved": int(prediction),
            "message": "Loan application processed successfully.",
        }

    except Exception as e:
        logging.error(f"Prediction error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


# **Run Server**
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)

#UPDATED FINALLLL