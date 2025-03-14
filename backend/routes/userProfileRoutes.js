const express = require('express');
const router = express.Router();
const { mysqlPool } = require('../db');

// Get user profile by ID
router.get('/profile/:user_id', async (req, res) => {
    try {
        const userId = req.params.user_id;
        const [userResults] = await mysqlPool.query("SELECT id, name, email, role, credit_score, income, employment_status FROM users WHERE id = ?", [userId]);

        if (userResults.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(userResults[0]);
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

module.exports = router;