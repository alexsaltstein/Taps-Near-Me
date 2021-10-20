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
];

const fakeBeers = [
    {
        "_id": "1", 
        "abv": "5", 
        "bid": "4010", 
        "breweryCity": "Leuven", 
        "breweryCountry": "Belgium", 
        "breweryId": "265", 
        "breweryName": "Stella Artois", 
        "breweryState": "Vlaanderen", 
        "breweryUrl": "https://untappd.com/brewery/265", 
        "flavorProfiles": "", 
        "gloablRatingScore": 3.26, 
        "ibu": "24", 
        "name": "Stella Artois", 
        "servingType": "Draft", 
        "type": "Pilsner - Other", 
        "untappdWebsite": "https://untappd.com/beer/4010"
    },
    {
        "_id": "2", 
        "abv": "5", 
        "bid": "4010", 
        "breweryCity": "Leuven", 
        "breweryCountry": "Belgium", 
        "breweryId": "265", 
        "breweryName": "Artois Stella", 
        "breweryState": "Vlaanderen", 
        "breweryUrl": "https://untappd.com/brewery/265", 
        "flavorProfiles": "", 
        "gloablRatingScore": 3.26, 
        "ibu": "24", 
        "name": "Artois Stella", 
        "servingType": "Draft", 
        "type": "Pilsner - Other", 
        "untappdWebsite": "https://untappd.com/beer/4010"
    },
    {
        "_id": "3", 
        "abv": "5", 
        "bid": "4010", 
        "breweryCity": "Leuven", 
        "breweryCountry": "Belgium", 
        "breweryId": "265", 
        "breweryName": "Stella Stella", 
        "breweryState": "Vlaanderen", 
        "breweryUrl": "https://untappd.com/brewery/265", 
        "flavorProfiles": "", 
        "gloablRatingScore": 3.26, 
        "ibu": "24", 
        "name": "Stella Stella", 
        "servingType": "Draft", 
        "type": "Pilsner - Other", 
        "untappdWebsite": "https://untappd.com/beer/4010"
    }
];



const getVenueById = async (id) => {
    if (id === null) {
        throw new Error('No id provided');
    }
    else {
        for (let i = 0; i < fakeVenues.length; i++) {
            if (fakeVenues[i]["_id"] === id) {
                return Promise.resolve(fakeVenues[i]);
            }
        }
    }

    throw new Error('No venue found with that id');

}
    

const getVenueByName = async (name) => {
    if (name === null) {
        throw new Error('No name provided');
    }
    else {
        for (let i = 0; i < fakeVenues.length; i++) {
            if (fakeVenues[i]["name"] === name) {
                return Promise.resolve(fakeVenues[i]);
            }
            
        }

        throw new Error('No venue found with that name');
    }
}

const createVenue = async (name, city, state, country, lat, lng) => {
        
    if (typeof name !== 'string' || name.trim() === '') throw new Error('name must be a non-empty string');
    if (typeof city !== 'string' || city.trim() === '') throw new Error('city must be a non-empty string');
    if (typeof state !== 'string' || state.trim() === '') throw new Error('state must be a non-empty string');
    if (typeof country !== 'string' || country.trim() === '') throw new Error('country must be a non-empty string');
    if (typeof lat !== 'string' || lat.trim() === '') throw new Error('lat must be a non-empty string');
    if (typeof lng !== 'string' || lng.trim() === '') throw new Error('lng must be a non-empty string');

        const newVenue = {
            _id: (fakeVenues.length + 1).toString(),
            name,
            city,
            state,
            country,
            lat,
            lng,
            beersAvailable: []
        }

        fakeVenues.push(newVenue);
        
        return Promise.resolve(getVenueById(newVenue["_id"]));



    }


module.exports = {
    getVenueById,
    getVenueByName, 
    createVenue
}