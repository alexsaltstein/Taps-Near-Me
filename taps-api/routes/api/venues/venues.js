const express = require('express');
const venuesRouter = require('./venues');
const venuesData = dataHelpers.venues;

const router = express.Router();

router.get('/filter', async (req, res) => {
  try {
    const location = [location[0], location[1]];
    const filter = radius;
    if (req.query.type){
      filter.type = req.query.type;
    }
    const venues = await venuesData.getVenuesByRadius(location, radius);
    return res.status(200).json({
      message: 'Found Venues within radius',
      venues    
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await beersData.getVenueById(id);
    return res.status(200).json({
      message: 'Found Valid venue',
      venue
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
module.exports = router;
