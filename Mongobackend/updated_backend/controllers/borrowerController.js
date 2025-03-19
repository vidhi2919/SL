/*
const Borrower = require("../models/borrowerModel");
const axios = require("axios");

exports.registerBorrower = async (req, res) => {
  try {
    const borrower = await Borrower.create(req.body);
    res.status(201).json(borrower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBorrower = async (req, res) => {
  try {
    const borrower = await Borrower.findById(req.params.id);
    if (!borrower) return res.status(404).json({ message: "Borrower not found" });
    res.json(borrower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.applyForLoan = async (req, res) => {
  try {
    const { borrowerId } = req.body;
    const borrower = await Borrower.findById(borrowerId);
    if (!borrower) return res.status(404).json({ message: "Borrower not found" });

    // ✅ Convert data to match ML model input format (15 features)
    const inputData = {
      age: borrower.age,
      income: borrower.income,
      loanAmount: borrower.loanAmount,
      creditScore: borrower.creditScore,
      monthsEmployed: borrower.monthsEmployed,
      numCreditLines: borrower.numCreditLines,
      interestRate: borrower.interestRate,
      loanTerm: borrower.loanTerm,
      dtiRatio: borrower.dtiRatio,
      education_Bachelors: borrower.education === "Bachelor's" ? 1 : 0,
      employment_SelfEmployed: borrower.employmentType === "Self-Employed" ? 1 : 0,
      marital_Married: borrower.maritalStatus === "Married" ? 1 : 0,
      hasMortgage: borrower.hasMortgage ? 1 : 0,
      hasDependents: borrower.hasDependents ? 1 : 0,
      hasCosigner: borrower.hasCosigner ? 1 : 0
    };
    
    console.log("Sending data to ML Server:", inputData);

    // ✅ Send to ML server
    const mlResponse = await axios.post("http://localhost:8000/predict-loan", inputData);
    console.log("ML Server Response:", mlResponse.data);

    const mlApproved = mlResponse.data.approved;
    if (mlApproved === undefined) return res.status(500).json({ message: "ML Server Error" });

    // ✅ Update approval status in database
    borrower.mlApproved = mlApproved;
    await borrower.save();

    res.json({ borrowerId, mlApproved });
  } catch (error) {
    console.error("Error in applyForLoan:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getTopBorrowers = async (req, res) => {
  try {
    const topBorrowers = await Borrower.find().sort({ creditScore: -1 }).limit(3);
    res.json(topBorrowers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
*/
const Borrower = require("../models/borrowerModel");
const axios = require("axios");

// ✅ Register a new Borrower
exports.registerBorrower = async (req, res) => {
  try {
    const borrower = await Borrower.create(req.body);
    res.status(201).json(borrower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBorrowerProfile = async (req, res) => {
  try {
      // Assuming you have a Borrower model in Mongoose
      const Borrower = require('../models/Borrower');  

      // Fetch borrower details using the request user ID (assuming authentication is implemented)
      const borrowerId = req.params.id; // or req.user.id if using authentication

      if (!borrowerId) {
          return res.status(400).json({ message: "Borrower ID is required" });
      }

      const borrower = await Borrower.findById(borrowerId);

      if (!borrower) {
          return res.status(404).json({ message: "Borrower not found" });
      }

      res.status(200).json({
          success: true,
          data: borrower
      });

  } catch (error) {
      console.error("Error fetching borrower profile:", error);
      res.status(500).json({ message: "Server error" });
  }
};


// ✅ Get Borrower Profile by ID
exports.getBorrower = async (req, res) => {
  try {
    const borrower = await Borrower.findById(req.params.id);
    if (!borrower) return res.status(404).json({ message: "Borrower not found" });
    
    res.status(200).json(borrower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Borrower Profile
exports.updateBorrowerProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProfile = await Borrower.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProfile) return res.status(404).json({ error: "Borrower not found" });

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Delete Borrower Profile
exports.deleteBorrowerProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProfile = await Borrower.findByIdAndDelete(id);

    if (!deletedProfile) return res.status(404).json({ error: "Borrower not found" });

    res.status(200).json({ message: "Borrower profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Apply for Loan (ML Model Integration)
exports.applyForLoan = async (req, res) => {
  try {
    const { borrowerId } = req.body;
    const borrower = await Borrower.findById(borrowerId);
    if (!borrower) return res.status(404).json({ message: "Borrower not found" });

    // ✅ Prepare data for ML Model
    const inputData = {
      age: borrower.age,
      income: borrower.income,
      loanAmount: borrower.loanAmount,
      creditScore: borrower.creditScore,
      monthsEmployed: borrower.monthsEmployed,
      numCreditLines: borrower.numCreditLines,
      interestRate: borrower.interestRate,
      loanTerm: borrower.loanTerm,
      dtiRatio: borrower.dtiRatio,
      education_Bachelors: borrower.education === "Bachelor's" ? 1 : 0,
      employment_SelfEmployed: borrower.employmentType === "Self-Employed" ? 1 : 0,
      marital_Married: borrower.maritalStatus === "Married" ? 1 : 0,
      hasMortgage: borrower.hasMortgage ? 1 : 0,
      hasDependents: borrower.hasDependents ? 1 : 0,
      hasCosigner: borrower.hasCosigner ? 1 : 0
    };
    
    console.log("Sending data to ML Server:", inputData);
    const mlResponse = await axios.post("http://localhost:8000/predict-loan", inputData);
    
    console.log("ML Server Response:", mlResponse.data);
    if (mlResponse.data.approved === undefined) {
      return res.status(500).json({ message: "ML Server Error" });
    }

    // ✅ Update approval status in DB
    borrower.mlApproved = mlResponse.data.approved;
    await borrower.save();

    res.json({ borrowerId, mlApproved: mlResponse.data.approved });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Top Borrowers by Credit Score
exports.getTopBorrowers = async (req, res) => {
  try {
    const topBorrowers = await Borrower.find().sort({ creditScore: -1 }).limit(3);
    res.json(topBorrowers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
