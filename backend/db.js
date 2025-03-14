const mysql = require('mysql2');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mysqlPool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));
mongoose.connect(process.env.MONGO_URI);

//Users Table
const userTable = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('borrower', 'lender') NOT NULL,
    credit_score INT DEFAULT NULL,
    income DECIMAL(10,2) DEFAULT NULL,
    employment_status ENUM('employed', 'self-employed', 'unemployed') DEFAULT NULL,
    debt_to_income_ratio DECIMAL(5,2) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

//Loans Table
const loanTable = `CREATE TABLE IF NOT EXISTS loans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    borrower_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    interest_rate DECIMAL(5,2) NOT NULL,
    tenure INT NOT NULL,
    funding_type ENUM('single', 'collaborative') NOT NULL,
    status ENUM('pending', 'approved', 'rejected', 'funded', 'repaid') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (borrower_id) REFERENCES users(id) ON DELETE CASCADE
)`;

//Lenders Table
const lenderTable = `CREATE TABLE IF NOT EXISTS lenders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    available_funds DECIMAL(10,2) NOT NULL,
    risk_appetite ENUM('low', 'medium', 'high') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)`;

//Loan Fundings Table (For Collaborative Lending)
const loanFundingTable = `CREATE TABLE IF NOT EXISTS loan_fundings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    loan_id INT NOT NULL,
    lender_id INT NOT NULL,
    amount_funded DECIMAL(10,2) NOT NULL,
    funded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (loan_id) REFERENCES loans(id) ON DELETE CASCADE,
    FOREIGN KEY (lender_id) REFERENCES lenders(id) ON DELETE CASCADE
)`;

//Transactions Table
const transactionTable = `CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    loan_id INT NOT NULL,
    lender_id INT,
    borrower_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    transaction_type ENUM('funding', 'repayment') NOT NULL,
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (loan_id) REFERENCES loans(id) ON DELETE CASCADE,
    FOREIGN KEY (borrower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lender_id) REFERENCES lenders(id) ON DELETE CASCADE
)`;

//Execute table creation
async function createTables() {
    try {
        await mysqlPool.query(userTable);
        await mysqlPool.query(loanTable);
        await mysqlPool.query(lenderTable);
        await mysqlPool.query(loanFundingTable);
        await mysqlPool.query(transactionTable);
        console.log('Tables created successfully');
    } catch (err) {
        console.error('Error creating tables:', err);
    }
}

createTables();

const LoanAgreement = require('./models/LoanAgreement');
const DocumentVerification = require('./models/DocumentVerification');
module.exports = { mysqlPool, mongoose, LoanAgreement, DocumentVerification };
module.exports = { mysqlPool, mongoose };