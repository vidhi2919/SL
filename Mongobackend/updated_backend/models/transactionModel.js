const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: "Loan", required: true },
  borrowerId: { type: mongoose.Schema.Types.ObjectId, ref: "Borrower", required: true },
  lenderId: { type: mongoose.Schema.Types.ObjectId, ref: "Lender", required: true },
  amountPaid: { type: Number, required: true },
  datePaid: { type: Date, default: Date.now },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Transaction", TransactionSchema);