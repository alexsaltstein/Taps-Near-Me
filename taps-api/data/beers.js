const uuid = require('uuid');
const mongoCollections = require('../config/mongoCollections');

const { beers } = mongoCollections;

module.exports = {
  async getBeerById(id) {
    if (!id) throw new Error('No id provided');
    const beersCollection = await beers();
    const beer = await beersCollection.findOne({ _id: id });
    if (!beer) throw new Error('No beer found with that id');
    return beer;
  },

  async createBeer(name) {
    const beersCollection = await beers();
  
    const newBeer = {
      _id: uuid.v4(),
      name,
    };
  
    const insertedInfo = await beersCollection.insertOne(newBeer);
    const newId = insertedInfo.insertedId;
    return this.getBeerById(newId);
  }
}