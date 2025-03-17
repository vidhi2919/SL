const express = require("express");
const { registerBorrower, getBorrower, applyForLoan, getTopBorrowers } = require("../controllers/borrowerController");

const router = express.Router();

router.post("/register", registerBorrower);
router.get("/top-borrowers", getTopBorrowers); // ✅ Place first to prevent ID conflict
router.get("/:id", getBorrower);
router.post("/apply-loan", applyForLoan);
router.get("/top-borrowers", getTopBorrowers);

module.exports = router;