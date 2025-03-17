const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');

const cors = require('cors');


router.use(cors());

router.post('/signup', verifyToken, signup); // ✅ Token will be verified here

module.exports = router;
