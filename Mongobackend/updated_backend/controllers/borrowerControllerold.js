const Borrower = require("../models/borrowerModel");
const checkLoanApproval = require("../config/mlConfig");
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
    const { borrowerId, loanAmount } = req.body;
    const borrower = await Borrower.findById(borrowerId);
    if (!borrower) return res.status(404).json({ message: "Borrower not found" });

    // const mlApproved = await checkLoanApproval(borrower);
    // if (mlApproved === null) return res.status(500).json({ message: "ML Server Error" });
    console.log("Sending data to ML Server:", borrower);
    const mlResponse = await axios.post("http://localhost:8000/predict-loan", borrower);
    console.log("ML Server Response:", mlResponse.data);
    
    const mlApproved = mlResponse.data.approved;
    if (mlApproved === undefined) return res.status(500).json({ message: "ML Server Error" });


    borrower.mlApproved = mlApproved;
    await borrower.save();
    
    // Call ML Model API
    //const mlResponse = await axios.post("http://localhost:8000/predict-loan", borrower);
    //const mlApproved = mlResponse.data.approved;

    // borrower.mlApproved = mlApproved;
    // await borrower.save();

    res.json({ borrowerId, mlApproved });
  } catch (error) {
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
