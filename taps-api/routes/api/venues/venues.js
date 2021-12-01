const express = require('express');
const dataHelpers = require('../../../data');
const beersData = dataHelpers.beers;
const venuesData = dataHelpers.venues;

const router = express.Router();

router.get('/beers/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const venue = await beersData.getBeersByVenue(id);
    return res.status(200).json({
      message: 'Found Valid beers for venue',
      venue
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.get('/location', async (req, res) => {
  try {
    const {lat, lng, radius} = req.query;
    const venues = await venuesData.getVenuesByRadius([lng, lat], radius);
    return res.status(200).json({
      message: 'Found venues within that location',
      venues
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.get('/mappoints', async (req, res) => {
  try {
    const {lat, lng, radius} = req.query;
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
    const beers = (await beersData.getBeersByFilter(filter)).map(beer => beer._id);

    const venues = (await venuesData.getVenuesByRadius([lng, lat], radius)).filter(venue => {
      return venue.beersAvailable.some(item => beers.includes(item))
    });

    return res.status(200).json({
      message: 'Found venues within that location',
      venues,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;