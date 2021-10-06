const express = require('express');
const dataHelpers = require('../../../data');
const beersData = dataHelpers.beers;

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Found Valid beers',
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;
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
