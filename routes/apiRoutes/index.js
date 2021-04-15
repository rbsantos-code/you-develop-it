// THIS FILE WILL ACT AS THE CENTRAL HUB

const express = require('express');
const router = express.Router();

router.use(require('./candidateRoutes'));

module.exports = router;