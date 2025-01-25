const express = require('express');
const router = express.Router();
const { searchByName, searchByPhone, getContactDetails } = require('../controllers/searchController');
const authMiddleware = require('../middleware/authMiddleware');

// Search by name
router.get('/search/name', authMiddleware, searchByName);

// Search by phone number
router.get('/search/phone', authMiddleware, searchByPhone);

// Get contact details
router.get('/contact/:id', authMiddleware, getContactDetails);

module.exports = router;