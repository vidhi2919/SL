const express = require('express');
const router = express.Router();
const DocumentVerification = require('../models/DocumentVerification');

// Upload Document for Verification
router.post('/upload', async (req, res) => {
    try {
        const { user_id, document_type, document_url } = req.body;
        const document = new DocumentVerification({ user_id, document_type, document_url });
        await document.save();
        res.status(201).json({ message: 'Document uploaded', document });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// Get User Documents
router.get('/user/:user_id', async (req, res) => {
    try {
        const documents = await DocumentVerification.find({ user_id: req.params.user_id });
        if (!documents.length) return res.status(404).json({ error: 'No documents found' });
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// Approve/Reject Document
router.put('/verify/:doc_id', async (req, res) => {
    try {
        const { status } = req.body; // 'approved' or 'rejected'
        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const document = await DocumentVerification.findByIdAndUpdate(
            req.params.doc_id,
            { verified: status === 'approved', verification_status: status },
            { new: true }
        );

        if (!document) return res.status(404).json({ error: 'Document not found' });
        res.status(200).json({ message: `Document ${status}`, document });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

module.exports = router;