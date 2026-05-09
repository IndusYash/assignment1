const express = require('express');
const router = express.Router();

const { addSchool, listSchools } = require('../controllers/schoolController');
const { addSchoolRules, listSchoolsRules, validate } = require('../middleware/validators');

// POST /addSchool
router.post('/addSchool', addSchoolRules, validate, addSchool);

// GET /listSchools?latitude=..&longitude=..
router.get('/listSchools', listSchoolsRules, validate, listSchools);

module.exports = router;
