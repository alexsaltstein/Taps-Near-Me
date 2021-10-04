const express = require('express');

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

module.exports = router;
