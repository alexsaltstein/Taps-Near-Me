const express = require('express');
const dataHelpers = require('../../../data');
const beersData = dataHelpers.beers;

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const beers = await beersData.getAllBeers();
    return res.status(200).json({
      message: 'Found Valid beers',
      beers
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.get('/filter', async (req, res) => {
  try {
    const filter = {};
    if (req.query.type) {
      filter.type = req.query.type;
    }
    if (req.query.minRating) {
      filter.minRating = req.query.minRating;
    }
    if (req.query.minABV) {
      filter.minABV = req.query.minABV;
    }
    if (req.query.maxABV) {
      filter.maxABV = req.query.maxABV;
    }
    if (req.query.minIBU) {
      filter.minIBU = req.query.minIBU;
    }
    if (req.query.maxIBU) {
      filter.maxIBU = req.query.maxIBU;
    }
    const beer = await beersData.getBeersByFilter(filter);
    return res.status(200).json({
      message: 'Found Valid beer',
      beer
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const beer = await beersData.getBeerById(id);
    return res.status(200).json({
      message: 'Found Valid beer',
      beer
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
