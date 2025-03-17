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
