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

module.exports = router;