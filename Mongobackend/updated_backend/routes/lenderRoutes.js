/*
const express = require("express");
const { registerLender, getLenders } = require("../controllers/lenderController");

const router = express.Router();

router.post("/register", registerLender);
router.get("/:id", getLenders);
// router.get("/", getLenders);

module.exports = router;
*/

const express = require("express");
const router = express.Router();
const lenderController = require("../controllers/lenderController");

// Lender routes
router.post("/register", lenderController.registerLender);
router.get("/:id", lenderController.getLender);

// Lender Profile routes (merged into lenderController)
router.get("/profile/:id", lenderController.getLenderProfile);
router.put("/profile/:id", lenderController.updateLenderProfile);
router.delete("/profile/:id", lenderController.deleteLenderProfile);

module.exports = router;
