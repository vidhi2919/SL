const express = require('express');
const router = express.Router();
const { mysqlPool } = require('../db');

// Borrower Repayment
router.post('/repay', async (req, res) => {
    try {
        const { loan_id, borrower_id, amount } = req.body;

        // Check if the loan exists
        const [loan] = await mysqlPool.query("SELECT * FROM loans WHERE id = ?", [loan_id]);
        if (loan.length === 0) return res.status(404).json({ error: "Loan not found" });

        // Insert repayment transaction
        await mysqlPool.query(
            "INSERT INTO transactions (loan_id, borrower_id, amount, transaction_type, status) VALUES (?, ?, ?, 'repayment', 'completed')",
            [loan_id, borrower_id, amount]
        );

        res.status(200).json({ message: "Repayment successful" });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

module.exports = router;