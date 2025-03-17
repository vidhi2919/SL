const Transaction = require("../models/transactionModel");

// Create a new transaction
const createTransaction = async (req, res) => {
    try {
      const { loanId, borrowerId, lenderId, amountPaid, datePaid, status } = req.body;
  
      const transaction = new Transaction({
        loanId,
        borrowerId,
        lenderId,
        amountPaid,
        datePaid,
        status,
      });
  
      await transaction.save();
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = { createTransaction };

// Get all transactions
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('loanId borrowerId lenderId');
        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get a transaction by ID
const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findById(id).populate('loanId borrowerId lenderId');

        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        res.status(200).json(transaction);
    } catch (error) {
        console.error("Error fetching transaction:", error.message);
        res.status(500).json({ error: error.message });
    }
};
const updateTransaction = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
  
      if (!updatedTransaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }
  
      res.status(200).json(updatedTransaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByIdAndDelete(id);
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

  
module.exports = {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
};
