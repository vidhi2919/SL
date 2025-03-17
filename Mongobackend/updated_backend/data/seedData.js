const mongoose = require("mongoose");
const Borrower = require("../models/borrowerModel");
const Lender = require("../models/lenderModel");
const Loan = require("../models/loanModel");
require("dotenv").config();
const connectDB = require("../config/db");
console.log('MONGODB_URI from env:', process.env.MONGODB_URI);


const seedData = async () => {
  await connectDB(); // Connect to MongoDB

  try {
    console.log("Seeding Database...");

    // Sample Borrowers
    const borrowers = [
      { name: "Amit Sharma", age: 30, income: 50000, loanAmount: 100000, creditScore: 750, monthsEmployed: 48, numCreditLines: 3, interestRate: 12, loanTerm: 24, dtiRatio: 25, education: "Bachelor's", employmentType: "Salaried", maritalStatus: "Married", hasMortgage: false, hasDependents: true, loanPurpose: "Home Renovation", hasCosigner: false },
      { name: "Priya Iyer", age: 28, income: 60000, loanAmount: 150000, creditScore: 780, monthsEmployed: 60, numCreditLines: 4, interestRate: 10, loanTerm: 36, dtiRatio: 20, education: "Master's", employmentType: "Salaried", maritalStatus: "Single", hasMortgage: false, hasDependents: false, loanPurpose: "Education", hasCosigner: true },
    ];

    // Sample Lenders
    const lenders = [
      { name: "Ravi Kumar", availableFunds: 200000, minInterestRate: 8, maxLoanAmount: 150000, maxLoanTerm: 36, riskAppetite: "Medium" },
      { name: "Neha Gupta", availableFunds: 500000, minInterestRate: 7, maxLoanAmount: 300000, maxLoanTerm: 48, riskAppetite: "Low" },
    ];

    // Sample Loans
    const loans = [
      { borrowerId: null, amountRequested: 100000, interestRate: 10, loanTerm: 24, approvedByML: true, status: "Pending", fundedBy: [] },
    ];

    await Borrower.deleteMany();
    await Lender.deleteMany();
    await Loan.deleteMany();

    const createdBorrowers = await Borrower.insertMany(borrowers);
    const createdLenders = await Lender.insertMany(lenders);

    loans[0].borrowerId = createdBorrowers[0]._id;
    await Loan.insertMany(loans);

    console.log("Database Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};

seedData();
