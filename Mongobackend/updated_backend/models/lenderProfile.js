/*
const mongoose = require('mongoose');

const lenderProfileSchema = new mongoose.Schema({
    profilePicture: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    investmentAmount: { type: String, required: true },
    loanType: { type: String, required: true },
    riskPreference: { type: String, required: true },
    bankDetails: {
        accountNumber: { type: String },
        ifscCode: { type: String }
    },
    documents: [
        {
            type: { type: String },
            file: { type: String }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("lenderProfile", lenderProfileSchema);
*/
const mongoose = require('mongoose');

const lenderProfileSchema = new mongoose.Schema({
    profilePicture: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: false }, // Made optional for signup
    investmentAmount: { type: String, required: false }, // Made optional for signup
    loanType: { type: String, required: false }, // Made optional for signup
    riskPreference: { type: String, required: false }, // Made optional for signup
    bankDetails: {
        accountNumber: { type: String },
        ifscCode: { type: String }
    },
    documents: [
        {
            type: { type: String },
            file: { type: String }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("LenderProfile", lenderProfileSchema);
