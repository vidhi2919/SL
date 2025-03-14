const express = require('express');
const router = express.Router();
const { mysqlPool } = require('../db');

// Fund a Loan (Single Lender or Collaborative)
router.post('/fund', async (req, res) => {
    try {
        const { loan_id, lender_id, amount } = req.body;

        // Check if the loan exists
        const [loanResults] = await mysqlPool.query("SELECT * FROM loans WHERE id = ?", [loan_id]);
        if (loanResults.length === 0) return res.status(404).json({ error: "Loan not found" });

        const loan = loanResults[0];

        // Check if lender has enough funds
        const [lenderResults] = await mysqlPool.query("SELECT * FROM lenders WHERE id = ?", [lender_id]);
        if (lenderResults.length === 0) return res.status(404).json({ error: "Lender not found" });

        const lender = lenderResults[0];
        if (lender.available_funds < amount) {
            return res.status(400).json({ error: "Insufficient funds" });
        }

        // Deduct funds from lender and update loan status
        await mysqlPool.query("UPDATE lenders SET available_funds = available_funds - ? WHERE id = ?", [amount, lender_id]);
        await mysqlPool.query("INSERT INTO loan_fundings (loan_id, lender_id, amount_funded) VALUES (?, ?, ?)", [loan_id, lender_id, amount]);

        // Check if the loan is fully funded
        const [totalFunding] = await mysqlPool.query("SELECT SUM(amount_funded) as total FROM loan_fundings WHERE loan_id = ?", [loan_id]);
        if (totalFunding[0].total >= loan.amount) {
            await mysqlPool.query("UPDATE loans SET status = 'funded' WHERE id = ?", [loan_id]);
        }

        res.status(200).json({ message: "Loan funded successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

module.exports = router;