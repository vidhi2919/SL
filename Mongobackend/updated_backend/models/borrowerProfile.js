/*
const mongoose = require("mongoose");

const BorrowerProfileSchema = new mongoose.Schema({
  profilePicture: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String },
  loanAmount: { type: String },
  loanPurpose: { type: String },
  loanTerm: { type: String },
  annualIncome: { type: String },
  creditScore: { type: String },
  bankDetails: {
    accountNumber: { type: String },
    ifscCode: { type: String },
  },
  documents: [
    {
      type: { type: String },
      file: { type: String },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("BorrowerProfile", BorrowerProfileSchema);
*/