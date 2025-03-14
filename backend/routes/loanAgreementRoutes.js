const express = require('express');
const router = express.Router();
const LoanAgreement = require('../models/LoanAgreement');

// Create Loan Agreement
router.post('/create', async (req, res) => {
    try {
        const { loan_id, borrower_id, lender_id, agreement_text } = req.body;
        const agreement = new LoanAgreement({ loan_id, borrower_id, lender_id, agreement_text });
        await agreement.save();
        res.status(201).json({ message: 'Loan agreement created', agreement });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// Get Loan Agreement
router.get('/:loan_id', async (req, res) => {
    try {
        const agreement = await LoanAgreement.findOne({ loan_id: req.params.loan_id });
        if (!agreement) return res.status(404).json({ error: 'Agreement not found' });
        res.status(200).json(agreement);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// Sign Loan Agreement
router.put('/sign/:loan_id', async (req, res) => {
    try {
        const { user_role } = req.body; // 'borrower' or 'lender'
        let update = user_role === 'borrower' ? { signed_by_borrower: true } : { signed_by_lender: true };
        
        const agreement = await LoanAgreement.findOneAndUpdate(
            { loan_id: req.params.loan_id },
            update,
            { new: true }
        );

        if (!agreement) return res.status(404).json({ error: 'Agreement not found' });
        res.status(200).json({ message: 'Agreement signed', agreement });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

module.exports = router;