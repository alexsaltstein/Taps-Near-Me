const express = require('express');
const venuesRouter = require('./venues');

const router = express.Router();

router.use('/', venuesRouter);

module.exports = router;
