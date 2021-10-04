const express = require('express');
const beersRouter = require('./beers');

const router = express.Router();

router.use('/beers', beersRouter);
module.exports = router;
