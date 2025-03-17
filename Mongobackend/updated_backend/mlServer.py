from fastapi import FastAPI
import joblib
import numpy as np
from pydantic import BaseModel
from pymongo import MongoClient
import os

# Load ML Model
model_path = os.path.join(os.path.dirname(__file__), "xgb_model.pkl")
model = joblib.load(model_path) 

# FastAPI App
app = FastAPI()

# MongoDB Connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://aroravidhi342:d615cAVlM5MnM5l2@cluster0.gzo5b.mongodb.net/loan_db?retryWrites=true&w=majority")
client = MongoClient(MONGO_URI)
db = client["smartlend"]

# Request Body Schema (Only 15 features)
class LoanRequest(BaseModel):
    age: int
    income: float
    loanAmount: float
    creditScore: int
    monthsEmployed: int
    numCreditLines: int
    interestRate: float
    loanTerm: int
    dtiRatio: float
    education_Bachelors: int
    education_Masters: int
    education_Doctorate: int
    employment_SelfEmployed: int
    employment_Unemployed: int
    marital_Married: int
    marital_Divorced: int
    marital_Widowed: int
    hasMortgage: int
    hasDependents: int
    hasCosigner: int


# **API Route to Predict Loan Approval**
@app.post("/predict-loan")
def predict_loan(data: LoanRequest):
    try:
        # Debugging: Print the raw input data
        print("Received data:", data)

        input_data = np.array([
            data.age, data.income, data.loanAmount, data.creditScore,
            data.monthsEmployed, data.numCreditLines, data.interestRate,
            data.loanTerm, data.dtiRatio,
            data.education_Bachelors, data.education_Masters, data.education_Doctorate, 
            data.employment_SelfEmployed, data.employment_Unemployed,
            data.marital_Married, data.marital_Divorced, data.marital_Widowed,
            data.hasMortgage, data.hasDependents, data.hasCosigner
        ]).reshape(1, -1)

        print("Model expects features:", model.feature_names_in_)

        # Predict
        prediction = model.predict(input_data)[0]
        return {"approved": int(prediction)}

    except Exception as e:
        return {"error": f"Prediction error: {str(e)}"}

# **Run Server**
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
