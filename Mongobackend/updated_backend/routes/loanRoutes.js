// const express = require("express");
// const { getLoanMatches, getBestCollaborativeFunding, fundLoan } = require("../controllers/loanController");

// const router = express.Router();

// router.get("/match/:borrowerId", getLoanMatches);
// router.get("/best-collaborative", getBestCollaborativeFunding);
// router.post("/fund-loan", fundLoan);

// module.exports = router;

const express = require("express");
const {
  getLoanMatches,
  getBestCollaborativeFunding,
  fundLoan,
  requestLoan,
} = require("../controllers/loanController");

const router = express.Router();

// ✅ Loan routes
router.get("/match/:borrowerId", getLoanMatches);
router.get("/best-collaborative", getBestCollaborativeFunding);
router.post("/fund-loan", fundLoan);
router.post("/request-loan", requestLoan);

module.exports = router;
