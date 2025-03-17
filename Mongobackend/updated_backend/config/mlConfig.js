const axios = require("axios");

const ML_SERVER_URL = "http://localhost:8000/predict-loan"; // Update if FastAPI runs on another host

const checkLoanApproval = async (borrowerData) => {
  try {
    const response = await axios.post(ML_SERVER_URL, borrowerData);
    return response.data.approved; // ML model returns 0 (No) or 1 (Yes)
  } catch (error) {
    console.error("ML Server Error:", error.message);
    return null; // Handle failure case
  }
};

module.exports = checkLoanApproval;
