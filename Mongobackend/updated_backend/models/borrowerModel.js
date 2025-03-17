const mongoose = require("mongoose");

const BorrowerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  income: { type: Number, required: true },
  loanAmount: { type: Number, required: true },
  creditScore: { type: Number, required: true },
  monthsEmployed: { type: Number, required: true },
  numCreditLines: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  loanTerm: { type: Number, required: true },
  dtiRatio: { type: Number, required: true },
  education: { type: String, enum: ["High School", "Bachelor's", "Master's", "Doctorate"], required: true },
  employmentType: { type: String, enum: ["Salaried", "Self-Employed", "Unemployed"], required: true },
  maritalStatus: { type: String, enum: ["Single", "Married", "Divorced", "Widowed"], required: true },
  hasMortgage: { type: Boolean, required: true },
  hasDependents: { type: Boolean, required: true },
  loanPurpose: { type: String, required: true },
  hasCosigner: { type: Boolean, required: true },
  mlApproved: { type: Number, enum: [0, 1], default: 0 }, // 0: No Loan, 1: Approved
}, { timestamps: true });

module.exports = mongoose.model("Borrower", BorrowerSchema);
