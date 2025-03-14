const mongoose = require('mongoose');

const LoanAgreementSchema = new mongoose.Schema({
    loan_id: { type: Number, required: true }, 
    borrower_id: { type: Number, required: true }, 
    lender_id: { type: Number, required: false }, 
    agreement_text: { type: String, required: true }, 
    signed_by_borrower: { type: Boolean, default: false },
    signed_by_lender: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LoanAgreement', LoanAgreementSchema);