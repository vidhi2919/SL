const mongoose = require('mongoose');

const DocumentVerificationSchema = new mongoose.Schema({
    user_id: { type: Number, required: true }, 
    document_type: { type: String, required: true }, 
    document_url: { type: String, required: true }, 
    verified: { type: Boolean, default: false },
    verification_status: { type: String, default: 'pending' }, 
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DocumentVerification', DocumentVerificationSchema);