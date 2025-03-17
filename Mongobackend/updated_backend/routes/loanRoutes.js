const express = require("express");
const { getLoanMatches, getBestCollaborativeFunding, fundLoan } = require("../controllers/loanController");

const router = express.Router();

router.get("/match/:borrowerId", getLoanMatches);
router.get("/best-collaborative", getBestCollaborativeFunding);
router.post("/fund-loan", fundLoan);

module.exports = router;