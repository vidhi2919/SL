const express = require('express');
const router = express.Router();
const { mysqlPool } = require('../db');

// Get Loan Repayment Schedule
router.get('/repayment-schedule/:loan_id', async (req, res) => {
    try {
        const [loan] = await mysqlPool.query("SELECT * FROM loans WHERE id = ?", [req.params.loan_id]);
        if (loan.length === 0) return res.status(404).json({ error: "Loan not found" });

        const tenure = loan[0].tenure; // Loan tenure in months
        const monthly_payment = loan[0].amount / tenure;

        const schedule = [];
        for (let i = 1; i <= tenure; i++) {
            schedule.push({
                month: i,
                due_amount: monthly_payment.toFixed(2),
                status: 'pending'
            });
        }

        res.status(200).json({ loan_id: loan[0].id, repayment_schedule: schedule });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

module.exports = router;