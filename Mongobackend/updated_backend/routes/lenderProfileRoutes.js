const express = require('express');
const { getLenderProfile, updateLenderProfile } = require('../controllers/lenderProfileController');

const router = express.Router();

// ✅ Route to get lender profile by ID
router.get('/:id', getLenderProfile);

// ✅ Route to update lender profile by ID
router.patch('/:id', updateLenderProfile);

module.exports = router;
