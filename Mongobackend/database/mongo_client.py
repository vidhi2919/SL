# database/mongo_client.py
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from tenacity import retry, stop_after_attempt, wait_fixed

load_dotenv()

class MongoDBClient:
    def __init__(self):
        self.client = MongoClient(os.getenv("MONGO_URI"))
        self.db = self.client.loan_db
        self.loan_eval_collection = self.db.LoanEvaluation

    @retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
    def save_evaluation(self, evaluation_data):
        try:
            result = self.loan_eval_collection.insert_one(evaluation_data)
            return result.inserted_id
        except Exception as e:
            print(f"Error saving evaluation: {e}")
            return None