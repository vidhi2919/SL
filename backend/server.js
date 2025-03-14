const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { mysqlPool, mongoose } = require('./db');
const loanAgreementRoutes = require('./routes/loanAgreementRoutes');
const documentVerificationRoutes = require('./routes/documentVerificationRoutes');
const loanMatchingRoutes = require('./routes/loanMatchingRoutes');
const loanFundingRoutes = require('./routes/loanFundingRoutes');
const loanTrackingRoutes = require('./routes/loanTrackingRoutes');
const loanRepaymentRoutes = require('./routes/loanRepaymentRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const lenderLoanApprovalRoutes = require('./routes/lenderLoanApprovalRoutes');  

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/loan-agreement', loanAgreementRoutes);
app.use('/api/document-verification', documentVerificationRoutes);
app.use('/api/loan-matching', loanMatchingRoutes);
app.use('/api/loan-funding', loanFundingRoutes);
app.use('/api/loan-tracking', loanTrackingRoutes);
app.use('/api/loan-repayment', loanRepaymentRoutes);
app.use('/api/user', userProfileRoutes);
app.use('/api/lender-loan-approval', lenderLoanApprovalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
