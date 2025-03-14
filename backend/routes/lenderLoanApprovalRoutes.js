const express = require('express');
const router = express.Router();
const { mysqlPool } = require('../db');

// Lender accepts or rejects a loan request
router.post('/approve-reject', async (req, res) => {
    try {
        const { loan_id, lender_id, decision } = req.body;

        if (!['approved', 'rejected'].includes(decision)) {
            return res.status(400).json({ error: "Invalid decision. Use 'approved' or 'rejected'." });
        }

        // Check if the loan exists
        const [loanResults] = await mysqlPool.query("SELECT * FROM loans WHERE id = ?", [loan_id]);
        if (loanResults.length === 0) return res.status(404).json({ error: "Loan not found" });

        // Store lender's decision
        await mysqlPool.query("INSERT INTO loan_approvals (loan_id, lender_id, status) VALUES (?, ?, ?)", 
            [loan_id, lender_id, decision]);

        res.status(200).json({ message: `Loan request ${decision} by lender ${lender_id}` });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

module.exports = router;