# schemas.py
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Literal

# schemas.py
class LoanEvaluationSchema(BaseModel):
    loanId: str = Field(..., description="Temporary or permanent ID")
    evaluationDate: datetime = Field(default_factory=datetime.utcnow)
    status: Literal["approved", "rejected", "pending"]
    willDefault: bool
    modelVersion: str = Field(default="v1.0")
    features: dict  # All input features from the user