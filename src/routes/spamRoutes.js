const express = require('express');
const router = express.Router();
const { markAsSpam } = require('../controllers/spamController');
const authMiddleware = require('../middleware/authMiddleware');

// Mark a number as spam
router.post('/spam', authMiddleware, markAsSpam);

module.exports = router;