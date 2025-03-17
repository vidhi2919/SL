const express = require("express");
const { registerLender, getLenders } = require("../controllers/lenderController");

const router = express.Router();

router.post("/register", registerLender);
router.get("/:id", getLenders);
// router.get("/", getLenders);

module.exports = router;