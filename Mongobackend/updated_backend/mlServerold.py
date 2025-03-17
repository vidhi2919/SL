from fastapi import FastAPI
import joblib
import numpy as np
from pydantic import BaseModel
from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()


# Load ML Model
# model = joblib.load("updated_backend/xgb_model.pkl")  # Ensure ml_model.pkl is in the same directory
model_path = os.path.join(os.path.dirname(__file__), "xgb_model.pkl")
model = joblib.load(model_path)


# FastAPI App
app = FastAPI()

# MongoDB Connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://aroravidhi342:d615cAVlM5MnM5l2@cluster0.gzo5b.mongodb.net/loan_db?retryWrites=true&w=majority")
client = MongoClient(MONGO_URI)
db = client["smartlend"]

# Request Body Schema
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
    education: str
    employmentType: str
    maritalStatus: str
    hasMortgage: bool
    hasDependents: bool
    loanPurpose: str
    hasCosigner: bool

# **API Route to Predict Loan Approval**
@app.post("/predict-loan")
def predict_loan(data: LoanRequest):
    try:
        # Convert input to ML model format
        input_data = np.array([
            data.age, data.income, data.loanAmount, data.creditScore,
            data.monthsEmployed, data.numCreditLines, data.interestRate,
            data.loanTerm, data.dtiRatio, 
            int(data.education == "Bachelor's"), int(data.education == "Master's"), int(data.education == "Doctorate"), 
            int(data.employmentType == "Self-Employed"), int(data.employmentType == "Unemployed"),
            int(data.maritalStatus == "Married"), int(data.maritalStatus == "Divorced"), int(data.maritalStatus == "Widowed"),
            int(data.hasMortgage), int(data.hasDependents), int(data.hasCosigner)
        ]).reshape(1, -1)

        # Predict
        prediction = model.predict(input_data)[0]  # 0 = No Loan, 1 = Approved

        return {"approved": int(prediction)}

    except Exception as e:
        return {"error": str(e)}

# **Run Server**
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)