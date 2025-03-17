# api/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
from services.loan_evaluation import evaluate_loan_direct

# Initialize FastAPI
app = FastAPI(
    title="P2P Lending API",
    description="Real-time loan evaluation system",
    version="1.0.0"
)

# CORS Configuration (adjust for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for loan application input
class LoanApplication(BaseModel):
    Age: int
    Income: float
    LoanAmount: float
    CreditScore: int
    MonthsEmployed: int
    NumCreditLines: int
    InterestRate: float
    DTIRatio: float
    Education: str
    EmploymentType: str
    MaritalStatus: str
    HasMortgage: bool
    HasDependents: bool
    LoanPurpose: str
    HasCoSigner: bool

@app.post("/evaluate", summary="Evaluate loan application")
async def evaluate_loan(application: LoanApplication):
    """
    Evaluate a loan application in real-time using ML model predictions.
    
    Returns:
    - loanId: Unique identifier for this evaluation
    - status: "approved" or "rejected"
    - evaluationId: MongoDB document ID
    """
    try:
        # Generate unique loan ID
        loan_id = f"LOAN-{uuid.uuid4().hex[:8].upper()}"
        
        # Process evaluation
        result = evaluate_loan_direct(loan_id, application.dict())
        
        if not result.get("success"):
            raise HTTPException(
                status_code=500,
                detail=result.get("error", "Evaluation failed")
            )

        return {
            "loanId": loan_id,
            "status": result["status"],
            "evaluationId": result["mongoId"],
            "riskAssessment": {
                "willDefault": result.get("willDefault", False),
                "modelVersion": result.get("modelVersion", "v1.0")
            }
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}

# To run locally (usually in main.py):
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)