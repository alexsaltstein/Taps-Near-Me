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

router.get('/markers', async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Found Valid markers',
      markers: [
        {
          "_id": "c50c5416-c466-48ec-8e12-8e28e6bd51e5",
          "type": "Point",
          "coordinates": [
            -73.9904,
            40.7542
          ],
          "name": "District Tap House",
          "city": "New York",
          "state": "NY",
          "country": "United States",
          "beersAvailable": [
            "d3ac8898-0e26-4a01-aa4f-321a2e5a271d",
            "c3476b30-beac-4a12-9d08-25bf300b1391",
            "64470d35-e053-42ef-af7d-580a96f08fd3",
            "2a97a537-82a0-4a64-8df6-4a657f9a3a9e",
            "376367c5-8fdb-490c-8c38-888643bb969e"
          ]
        },
        {
          "_id": "2fe6f916-fe54-4f95-b404-8e9d5f538d8c",
          "type": "Point",
          "coordinates": [
            -74.0228,
            40.7518
          ],
          "name": "Pier 13 - P13R",
          "city": "Hoboken",
          "state": "NJ",
          "country": "United States",
          "beersAvailable": [
            "5b4d3af6-4f8a-424c-81c7-346851a70378"
          ]
        },
        {
          "_id": "dda59cdb-48b0-4e97-b153-030bc32d6412",
          "type": "Point",
          "coordinates": [
            -74.0315,
            40.7552
          ],
          "name": "Pilsener Haus & Biergarten",
          "city": "Hoboken",
          "state": "NJ",
          "country": "United States",
          "beersAvailable": [
            "5c4c8ba6-02ab-49f9-ad56-87ce93be47e3",
            "ed3906b6-b7d6-49fc-a4ea-f09ebca0c68a",
            "90113450-39b3-4af7-b876-6cf4e702b02b",
            "49ade7c7-e3b1-4f42-bfc1-8fec99a93aea",
            "4330584f-ce8c-4696-bf1c-e2c01b82bf9f",
            "5a09026b-deb1-4a7a-9bb5-8ae7f85836ce"
          ]
        },
      ]

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
