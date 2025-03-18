/*
const express = require("express");
const { registerBorrower, getBorrower, applyForLoan, getTopBorrowers } = require("../controllers/borrowerController");

const router = express.Router();

router.post("/register", registerBorrower);
router.get("/top-borrowers", getTopBorrowers); // ✅ Place first to prevent ID conflict
router.get("/:id", getBorrower);
router.post("/apply-loan", applyForLoan);
router.get("/top-borrowers", getTopBorrowers);

module.exports = router;
*/
const express = require("express");
const router = express.Router();
const { registerBorrower,getBorrower,applyForLoan,getTopBorrowers,getBorrowerProfile, updateBorrowerProfile, deleteBorrowerProfile} = require("../controllers/borrowerController");

// Borrower routes
router.post("/register", registerBorrower);
router.get("/:id", getBorrower);
router.post("/apply-loan", applyForLoan);
router.get("/top-borrowers", getTopBorrowers);

// Borrower Profile routes (merged into borrowerController)
router.get("/profile/:id", getBorrowerProfile);
router.put("/profile/:id", updateBorrowerProfile);
router.delete("/profile/:id", deleteBorrowerProfile);

module.exports = router;
