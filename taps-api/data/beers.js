const uuid = require('uuid');
const mongoCollections = require('../config/mongoCollections');
const { SERVING_TYPES } = require('./consts');
const { getVenueByName, getVenueById } = require('./venues');

const { beers, venues } = mongoCollections;


module.exports = {
  async getBeerById(id) {
    if (!id) throw new Error('No id provided');
    const beersCollection = await beers();
    const beer = await beersCollection.findOne({ _id: id });
    if (!beer) throw new Error('No beer found with that id');
    return beer;
  },

  async getAllBeers() {
    const beersCollection = await beers();
    const beersArr = await beersCollection.find().toArray();
    if (!beersArr || beersArr.length === 0) throw new Error('No beers found');
    return beersArr;
  },

  async getBeerByName(name) {
    if (!name) throw new Error('No name provided');
    const beersCollection = await beers();
    const beer = await beersCollection.findOne({ name: name });
    if (!beer) throw new Error('No beer found with that name');
    return beer;
  },

  async getBeersByVenue(venueId) {
    if (!venueId) throw new Error('No venueId provided');
    const venue = await getVenueById(venueId);
    const beersCollection = await beers();
    const beersArr = await beersCollection.find({ _id: { $in: venue.beersAvailable } }).toArray();
    if (!beersArr || beersArr.length === 0) throw new Error('No beers found for that venue');
    venue.beersAvailable = beersArr;
    return venue;
  },

  /*
  valid filter:
  {
    type,
    minGlobalRatingScore,
  }
  */
  async getBeersByFilter(filter) {
    if (!filter) throw new Error('You must provide a filter to query');
    const beersCollection = await beers();
    const beersArr = await beersCollection.find({
      ...(
        filter.type && {
          type: {
            $regex: `^${filter.type}`,
            $options: 'i'
          }
        }),
      ...(
        filter.minGlobalRatingScore && {
          gloablRatingScore: {
            $gte: parseFloat(filter.minGlobalRatingScore),
          }
        })
    }).toArray();
    if (!beersArr || beersArr.length === 0) throw new Error('No beers found with that filter');
    return beersArr;
  },

  async addBeerToVenue(venueName, beerId) {
    if (!venueName) throw new Error('No name provided');
    if (!beerId) throw new Error('No beerId provided');
    await this.getBeerById(beerId);

    const venue = await getVenueByName(venueName);

    const venuesCollection = await venues();
    const updatedInfo = await venuesCollection.updateOne({ _id: venue._id }, { $addToSet: { beersAvailable: beerId } });
    if (updatedInfo.modifiedCount === 0) throw new Error('Failed to add beer to venue');
    return getVenueById(venue._id);
  },


  async createBeer(name, breweryName,
    type, abv, ibu, untappdWebsite, breweryUrl,
    breweryCountry, breweryCity, breweryState,
    flavorProfiles, servingType, bid, breweryId,
    gloablRatingScore, venueName) {
    getVenueByName(venueName);
    try {
      const beer = await this.getBeerByName(name);
      if (beer) {
        try {
          await this.addBeerToVenue(venueName, beer._id);
        } catch {
          console.log('This beer already exists and is in the venue');
          return;
        }
      }
    } catch {
      if (typeof name !== 'string' || name.trim() === '') throw new Error('name must be a non-empty string');
      if (typeof breweryName !== 'string' || breweryName.trim() === '') throw new Error('breweryName must be a non-empty string');
      if (typeof type !== 'string' || type.trim() === '') throw new Error('type must be a non-empty string');
      if (typeof abv !== 'number' || abv < 0) throw new Error('abv must be a number greater than or equal to 0');
      if (typeof ibu !== 'number' || ibu < 0) throw new Error('ibu must be a number greater than or equal to 0');
      if (typeof untappdWebsite !== 'string' || untappdWebsite.trim() === '') throw new Error('untappdWebsite must be a non-empty string and a valid website');
      if (typeof breweryUrl !== 'string' || breweryUrl.trim() === '') throw new Error('breweryUrl must be a non-empty string and a valid website');
      if (typeof breweryCountry !== 'string' || breweryCountry.trim() === '') throw new Error('breweryCountry must be a non-empty string');
      if (typeof breweryCity !== 'string' || breweryCity.trim() === '') throw new Error('breweryCity must be a non-empty string');
      if (typeof breweryState !== 'string' || breweryState.trim() === '') throw new Error('breweryState must be a non-empty string');
      if (typeof flavorProfiles !== 'string') throw new Error('flavorProfiles must be a string');
      if (typeof servingType !== 'string' || !SERVING_TYPES.includes(servingType)) throw new Error('servingType must be a non-empty string within valid types');
      if (typeof bid !== 'string' || bid.trim() === '') throw new Error('bid must be a non-empty string');
      if (typeof breweryId !== 'string' || breweryId.trim() === '') throw new Error('breweryId must be a non-empty string');
      if (typeof gloablRatingScore !== 'number' || gloablRatingScore < 0 || gloablRatingScore > 5) throw new Error('globalRatingScore must be a number between 0 and 5');
    }
    const beersCollection = await beers();

    const newBeer = {
      _id: uuid.v4(),
      name,
      breweryName,
      type,
      abv,
      ibu,
      untappdWebsite,
      breweryUrl,
      breweryCountry,
      breweryCity,
      breweryState,
      flavorProfiles,
      servingType,
      bid,
      breweryId,
      gloablRatingScore,
    };
    const insertedInfo = await beersCollection.insertOne(newBeer);
    const newId = insertedInfo.insertedId;
    this.addBeerToVenue(venueName, newId);
    return this.getBeerById(newId);
  }
}
