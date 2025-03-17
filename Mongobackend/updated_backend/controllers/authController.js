/*
const Lender = require('../models/lenderProfile');
const Borrower = require('../models/borrowerProfile');

const signup = async (req, res) => {
    try {
        const { uid, email, name } = req.user; // Extracted from Firebase token
        const { phone, address, investmentAmount, loanType, riskPreference, isLender } = req.body;

        // ✅ Check if user already exists
        const existingUser = isLender
            ? await Lender.findOne({ email })
            : await Borrower.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // ✅ Create new user in MongoDB
        if (isLender) {
            const newLender = new Lender({
                name,
                email,
                phone,
                address,
                investmentAmount,
                loanType,
                riskPreference
            });
            await newLender.save();
        } else {
            const newBorrower = new Borrower({
                name,
                email,
                phone,
                address
            });
            await newBorrower.save();
        }

        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { signup };
*/

const Lender = require('../models/lenderProfile');
const Borrower = require('../models/borrowerProfile');

const signup = async (req, res) => {
    try {
        const { uid, fullName, email, phoneNumber, isLender, loanAmount, lenderType } = req.body;

        // ✅ Validation: Ensure required fields are provided
        if (!fullName || !email || !phoneNumber) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // ✅ Check if user already exists in the correct collection
        const existingUser = isLender
            ? await Lender.findOne({ email })
            : await Borrower.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        if (isLender) {
            // ✅ Create new Lender record
            const newLender = new Lender({
                name: fullName,
                email,
                phone: phoneNumber,
                address: null, // Optional fields default to null
                investmentAmount: loanAmount || null,
                loanType: lenderType || null,
                riskPreference: null
            });

            await newLender.save();
            console.log('✅ Lender Profile Created:', newLender);

        } else {
            // ✅ Create new Borrower record
            const newBorrower = new Borrower({
                name: fullName,
                email,
                phone: phoneNumber,
                address: null,
                loanAmount: loanAmount || null,
                loanPurpose: null,
                loanTerm: null,
                annualIncome: null,
                creditScore: null,
                bankDetails: {
                    accountNumber: null,
                    ifscCode: null
                },
                documents: []
            });

            await newBorrower.save();
            console.log('✅ Borrower Profile Created:', newBorrower);
        }

        res.status(201).json({ message: 'Signup successful' });
        
    } catch (error) {
        console.error('❌ Error during signup:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { signup };
