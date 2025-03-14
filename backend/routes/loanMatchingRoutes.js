const express = require('express');
const router = express.Router();
const { mysqlPool } = require('../db');

// Match Lenders to a Loan Request
router.get('/match/:loan_id', async (req, res) => {
    try {
        const [loanResults] = await mysqlPool.query("SELECT * FROM loans WHERE id = ?", [req.params.loan_id]);
        if (loanResults.length === 0) return res.status(404).json({ error: "Loan not found" });

        const loan = loanResults[0];

        let lenderQuery = "SELECT * FROM lenders WHERE available_funds >= ?";
        const queryParams = [loan.amount];

        if (loan.funding_type === 'collaborative') {
            lenderQuery = "SELECT * FROM lenders WHERE available_funds > 0 ORDER BY available_funds DESC";
        }

        const [lenders] = await mysqlPool.query(lenderQuery, queryParams);
        if (lenders.length === 0) return res.status(404).json({ error: "No lenders available" });

        res.status(200).json({ matched_lenders: lenders });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});
function getBestCollaborativeOptions(lenders, loan_amount) {
    let best_combinations = [];

    function findCombinations(startIndex, currentCombination, remainingAmount, totalInterest) {
        if (remainingAmount <= 0) {
            best_combinations.push({ lenders: [...currentCombination], totalInterest });
            return;
        }
        
        for (let i = startIndex; i < lenders.length; i++) {
            if (remainingAmount - lenders[i].available_funds < 0) continue;

            currentCombination.push(lenders[i]);
            findCombinations(i + 1, currentCombination, remainingAmount - lenders[i].available_funds, 
                totalInterest + (lenders[i].available_funds * lenders[i].interest_rate / 100));
            currentCombination.pop();
        }
    }

    findCombinations(0, [], loan_amount, 0);
    best_combinations.sort((a, b) => a.totalInterest - b.totalInterest);
    return best_combinations.slice(0, 3); // Return top 3 best combinations
}

// API to match lenders for a loan
router.get('/match/:loan_id', async (req, res) => {
    try {
        const [loanResults] = await mysqlPool.query("SELECT * FROM loans WHERE id = ?", [req.params.loan_id]);
        if (loanResults.length === 0) return res.status(404).json({ error: "Loan not found" });

        const loan = loanResults[0];

        // Fetch all lenders with available funds
        const [lenders] = await mysqlPool.query("SELECT * FROM lenders WHERE available_funds > 0 ORDER BY interest_rate ASC");

        if (lenders.length === 0) return res.status(404).json({ error: "No lenders available" });

        // Find single lenders who can fund the full loan
        const singleLenders = lenders.filter(lender => lender.available_funds >= loan.amount)
            .map(lender => ({
                lender_id: lender.id,
                available_funds: lender.available_funds,
                interest_rate: lender.interest_rate,
                total_repayment: loan.amount + (loan.amount * lender.interest_rate / 100) // Simple interest calculation
            }));

        // Find the 3 best collaborative lender combinations
        const bestCollaborativeOptions = getBestCollaborativeOptions(lenders, loan.amount);

        res.status(200).json({
            loan_id: loan.id,
            amount_requested: loan.amount,
            single_lenders: singleLenders,
            best_collaborative_options: bestCollaborativeOptions
        });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

module.exports = router;