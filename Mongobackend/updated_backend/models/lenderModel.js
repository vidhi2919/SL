const mongoose = require("mongoose");

const LenderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  availableFunds: { type: Number, required: true }, // How much lender can fund
  minInterestRate: { type: Number, required: true }, // Minimum acceptable interest rate
  maxLoanAmount: { type: Number, required: true }, // Maximum single loan they can fund
  maxLoanTerm: { type: Number, required: true }, // Max tenure lender is okay with
  riskAppetite: { type: String, enum: ["Low", "Medium", "High"], required: true },
}, { timestamps: true });

module.exports = mongoose.model("Lender", LenderSchema);
