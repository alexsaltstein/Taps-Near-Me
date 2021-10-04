const express = require('express');
const beersRouter = require('./beers');

const router = express.Router();

router.use('/', beersRouter);

module.exports = router;
