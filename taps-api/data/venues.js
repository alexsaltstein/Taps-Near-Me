const uuid = require('uuid');
const mongoCollections = require('../config/mongoCollections');
const { venues } = mongoCollections;

module.exports = {
  async getVenueById(id) {
    if (!id) throw new Error('No id provided');
    const venuesCollection = await venues();
    const venue = await venuesCollection.findOne({ _id: id });
    if (!venue) throw new Error('No venue found with that id');
    return venue;
  },

  async getVenueByName(name) {
    if (!name) throw new Error('No name provided');
    const venuesCollection = await venues();
    const venue = await venuesCollection.findOne({ name });
    if (!venue) throw new Error('No venue found with that name');
    return venue;
  },

  async getVenuesByRadius(location, radius) {
    if (!location) throw new Error('No location provided');
    if (!radius) throw new Error('No radius provided');
    const userlocation = location.map(item => parseFloat(item));
    const radiusinput = parseInt(radius);
    if (userlocation.length != 2) throw new Error('location must be an array of length 2 ([lng, lat])');
    if (isNaN(userlocation[0]) || isNaN(userlocation[1])) throw new Error('location input for lng & lat must be numbers!');
    if (isNaN(radiusinput)) throw new Error('radius input must be a number');
    if (userlocation[0] > 180 || userlocation[0] < -180) throw new Error('lng must be a number between -180 and 180!');
    if (userlocation[1] > 90 || userlocation[1] < -90) throw new Error('lat must be a number between -90 and 90!');
    const venuesCollection = await venues();
    const venuesArr = await venuesCollection.find({
      coordinates:
      {
        $geoWithin:
          { $centerSphere: [[userlocation[0], userlocation[1]], radius / 3963.2] }
      }
    }).toArray();
    if (!venuesArr || venuesArr.length === 0) throw new Error(`No venues found with a ${radiusinput} mile radius`);
    return venuesArr;
  },

  async createVenue(name, city, state, country, lat, lng) {
    if (typeof name !== 'string' || name.trim() === '') throw new Error('name must be a non-empty string');
    if (typeof city !== 'string' || city.trim() === '') throw new Error('city must be a non-empty string');
    if (typeof state !== 'string' || state.trim() === '') throw new Error('state must be a non-empty string');
    if (typeof country !== 'string' || country.trim() === '') throw new Error('country must be a non-empty string');

    const longitude = parseFloat(lng);
    const latitude = parseFloat(lat);
    if (isNaN(longitude) || longitude > 180 || longitude < -180) throw 'lng must be a number between -180 and 180!';
    if (isNaN(latitude) || latitude > 90 || latitude < -90) throw 'lat must be a number between -90 and 90!';
    // schmema changed to be in geojson format
    const newVenue = {
      _id: uuid.v4(),
      type: "Point",
      coordinates: [longitude, latitude],
      name,
      city,
      state,
      country,
      beersAvailable: []
    };

    const venuesCollection = await venues();

    const insertedInfo = await venuesCollection.insertOne(newVenue);
    const newId = insertedInfo.insertedId;
    return this.getVenueById(newId);
  }
}
