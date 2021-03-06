const express = require('express');
const beersRouter = require('./beers');
const venuesRouter = require('./venues');

const router = express.Router();

router.use('/beers', beersRouter);
router.use('/venues', venuesRouter);
module.exports = router;
