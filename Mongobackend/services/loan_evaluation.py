# services/loan_evaluation.py
from datetime import datetime
from typing import Dict, Any
import joblib
import numpy as np
from pydantic import ValidationError
from database.mongo_client import MongoDBClient
from schemas import LoanEvaluationSchema

# Load your pre-trained ML model
MODEL = joblib.load("ml_models/xgb_model.pkl")

# Categorical encoding mappings (adjust based on your model's training)
CATEGORICAL_MAPS = {
    "Education": {
        "High School": 0,
        "Bachelor": 1,
        "Master": 2,
        "PhD": 3
    },
    "EmploymentType": {
        "Unemployed": 0,
        "Part-time": 1,
        "Full-time": 2,
        "Self-employed": 3
    },
    "MaritalStatus": {
        "Single": 0,
        "Married": 1,
        "Divorced": 2
    },
    "LoanPurpose": {
        "Debt Consolidation": 0,
        "Home Improvement": 1,
        "Business": 2,
        "Education": 3
    }
}

def encode_features(features: Dict[str, Any]) -> Dict[str, Any]:
    """Convert categorical features to model-friendly encoding"""
    encoded = features.copy()
    
    # Encode categorical features
    for field, mapping in CATEGORICAL_MAPS.items():
        encoded[field] = mapping.get(features[field], -1)  # -1 for unknown categories
    
    # Convert booleans to 0/1
    encoded["HasMortgage"] = int(features["HasMortgage"])
    encoded["HasDependents"] = int(features["HasDependents"])
    encoded["HasCoSigner"] = int(features["HasCoSigner"])
    
    return encoded

def run_ml_model(features: Dict[str, Any]) -> bool:
    """Run the ML model with properly encoded features"""
    try:
        # Feature order must match model's training data order
        feature_order = [
            "Age", "Income", "LoanAmount", "CreditScore",
            "MonthsEmployed", "NumCreditLines", "InterestRate",
            "DTIRatio", "Education", "EmploymentType",
            "MaritalStatus", "HasMortgage", "HasDependents",
            "LoanPurpose", "HasCoSigner"
        ]
        
        # Convert to list in correct order with float values
        feature_values = [float(features[key]) for key in feature_order]
        
        # Predict
        prediction = MODEL.predict([feature_values])[0]
        return bool(prediction)
    
    except Exception as e:
        raise ValueError(f"Model prediction failed: {str(e)}")

def evaluate_loan_direct(loan_id: str, raw_features: Dict[str, Any]) -> Dict[str, Any]:
    """Main evaluation workflow"""
    try:
        # 1. Encode features
        encoded_features = encode_features(raw_features)
        
        # 2. Run ML model
        will_default = run_ml_model(encoded_features)
        
        # 3. Build evaluation document
        evaluation_data = {
            "loanId": loan_id,
            "status": "rejected" if will_default else "approved",
            "willDefault": will_default,
            "modelVersion": "v1.0",
            "features": raw_features  # Store original features for audit
        }
        
        # 4. Validate and save to MongoDB
        validated_data = LoanEvaluationSchema(**evaluation_data).dict()
        mongo_client = MongoDBClient()
        inserted_id = mongo_client.save_evaluation(validated_data)
        
        # 5. Async save to SQL (implement your async logic here)
        # save_to_sql_async(loan_id, raw_features)
        
        return {
            "success": True,
            "loanId": loan_id,
            "status": evaluation_data["status"],
            "mongoId": str(inserted_id)
        }
    
    except ValidationError as e:
        return {"success": False, "error": f"Validation error: {e}"}
    except Exception as e:
        return {"success": False, "error": f"Evaluation failed: {str(e)}"}

# Example usage for testing
if __name__ == "__main__":
    test_features = {
        "Age": 35,
        "Income": 75000,
        "LoanAmount": 20000,
        "CreditScore": 650,
        "MonthsEmployed": 12,
        "NumCreditLines": 3,
        "InterestRate": 8.5,
        "DTIRatio": 0.4,
        "Education": "Bachelor",
        "EmploymentType": "Full-time",
        "MaritalStatus": "Married",
        "HasMortgage": True,
        "HasDependents": True,
        "LoanPurpose": "Home Improvement",
        "HasCoSigner": False
    }
    
    result = evaluate_loan_direct("TEST-123", test_features)
    print("Evaluation Result:", result)