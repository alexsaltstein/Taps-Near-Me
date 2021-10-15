// const uuid = require('uuid');
// const mongoCollections = require('../config/mongoCollections');
// const { SERVING_TYPES } = require('./consts');
// const { isValidimgURL, isValidURL } = require('./utils');
// const { getVenueByName, getVenueById } = require('./venues');
//const { getBeerById } = require('./beers')

//const { beers, venues } = mongoCollections;

const fakeVenues = [
    {
        "_id":"1",
        "name":"Thatcher McGhee's",
        "city":"Pompton Lakes",
        "state":"NJ",
        "country":"United States",
        "lat":"41.0076",
        "lng":"-74.2951",
        "beersAvailable":["51d6d03b-f243-4a1c-bb8e-f3297f01043d"]
    },
    {
        "_id":"2",
        "name":"Thatcher Thatcher's",
        "city":"Pompton Lakes",
        "state":"NJ",
        "country":"United States",
        "lat":"41.0076",
        "lng":"-74.2951",
        "beersAvailable":["51d6d03b-f243-4a1c-bb8e-f3297f01043d"]
    },
    {
        "_id":"3",
        "name":"Thatcher",
        "city":"Pompton Lakes",
        "state":"NJ",
        "country":"United States",
        "lat":"41.0076",
        "lng":"-74.2951",
        "beersAvailable":["51d6d03b-f243-4a1c-bb8e-f3297f01043d"]
    }
]



const getVenueById = (id) => {
    if (id === null) {
        throw new Error('No id provided');
        return Promise.reject();
    }
    else {
        for (let i = 0; i < fakeVenues.length; i++) {
            if (fakeVenues[i]["_id"] === id) {
                return Promise.resolve(fakeVenues[i]);
            }
        }
    }

    throw new Error('No venue found with that id');
    return Promise.reject();

}
    

const getVenueByName = (name) => {
    if (name === null) {
        throw new Error('No name provided');
        return Promise.reject();
    }
    else {
        for (let i = 0; i < fakeVenues.length; i++) {
            if (fakeVenues[i]["name"] === name) {
                return Promise.resolve(fakeVenues[i]);
            }
            
        }

        throw new Error('No venue found with that name');
        return Promise.reject();
    }
}


module.exports = {
    getVenueById,
    getVenueByName
}