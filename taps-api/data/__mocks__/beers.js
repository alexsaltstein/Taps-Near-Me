// const uuid = require('uuid');
// const mongoCollections = require('../config/mongoCollections');
// const { SERVING_TYPES } = require('./consts');
// const { isValidimgURL, isValidURL } = require('./utils');
// const { getVenueByName, getVenueById } = require('./venues');
//const { getBeerById } = require('./beers')

//const { beers, venues } = mongoCollections;

const { getVenueById, getVenueByName } = require('./venues');

const fakeBeers = [
    {
        "_id": "1", 
        "abv": 5, 
        "bid": "4010", 
        "breweryCity": "Leuven", 
        "breweryCountry": "Belgium", 
        "breweryId": "265", 
        "breweryName": "Stella Artois", 
        "breweryState": "Vlaanderen", 
        "breweryUrl": "https://untappd.com/brewery/265", 
        "flavorProfiles": "", 
        "gloablRatingScore": 3.26, 
        "ibu": 24, 
        "name": "Stella Artois", 
        "servingType": "Draft", 
        "type": "Pilsner - Other", 
        "untappdWebsite": "https://untappd.com/beer/4010"
    },
    {
        "_id": "2", 
        "abv": 7, 
        "bid": "4010", 
        "breweryCity": "Leuven", 
        "breweryCountry": "Belgium", 
        "breweryId": "265", 
        "breweryName": "Artois Stella", 
        "breweryState": "Vlaanderen", 
        "breweryUrl": "https://untappd.com/brewery/265", 
        "flavorProfiles": "", 
        "gloablRatingScore": 3.66, 
        "ibu": 55, 
        "name": "Artois Stella", 
        "servingType": "Draft", 
        "type": "IPA - American", 
        "untappdWebsite": "https://untappd.com/beer/4010"
    },
    {
        "_id": "3", 
        "abv": 3, 
        "bid": "4010", 
        "breweryCity": "Leuven", 
        "breweryCountry": "Belgium", 
        "breweryId": "265", 
        "breweryName": "Stella Stella", 
        "breweryState": "Vlaanderen", 
        "breweryUrl": "https://untappd.com/brewery/265", 
        "flavorProfiles": "", 
        "gloablRatingScore": 3.26, 
        "ibu": 5, 
        "name": "Stella Stella", 
        "servingType": "Draft", 
        "type": "Sour - Berliner Weisse", 
        "untappdWebsite": "https://untappd.com/beer/4010"
    }
];

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

const emptyBeers = [];

const SERVING_TYPES = [
    'Draft',
    'Can',
    'Bottle'
  ];

const getBeerById = (id) => {
    if (id === null) {
        throw new Error("No id provided");
    }
    else {
        for (let i = 0; i < fakeBeers.length; i++) {
            if (fakeBeers[i]["_id"] === id) {
                return Promise.resolve(fakeBeers[i]);
            }
        }
        throw new Error("No beer with that id found")
    }
}

const getBeerByName = (name) => {
    if (name === null) {
        throw new Error("No name provided");
        
    }
    else {
        for (let i = 0; i < fakeBeers.length; i++) {
            if (fakeBeers[i]["name"] === name) {
                return Promise.resolve(fakeBeers[i]);
            }
        }
        throw new Error("No beer with that name found");
        
    }
}

const getAllBeers = (beers) => {
    if (beers.length === 0) {
        throw new Error("No beers found");
    }
    else {
        return Promise.resolve(beers);
    }
}

const addBeerToVenue = (venueName, beerId) => {
    if(venueName === null) {
        throw new Error("No name provided");
    }
    else if (beerId === null) {
        throw new Error("No beerId provided");
    }
    else {

        let beer;
        for (let i = 0; i < fakeBeers.length; i++) {
            if (fakeBeers[i]['_id'] === beerId) {
                beer = fakeBeers[i];
                break;
            }
        }

        let venue;
        for (let i = 0; i < fakeVenues.length; i++) {
            if (fakeVenues[i]['name'] === venueName) {
                venue = fakeVenues[i];
                break;
            }
        }
        
        if (venue['beersAvailable'].includes(beer["beerId"])) {
            throw new Error('Failed to add beer to venue');
        }
        else {
            Promise.resolve(venue["beersAvailable"].push(beerId));
            return Promise.resolve(venue);
        }

    }
}



const getBeersByFilter = (filters) => {

    let beerList;

    if (filters === null) {
        throw new Error('You must provide a filter to query') 
    }
    else {
        beerList = fakeBeers.filter(beer => filters['type'] === undefined ? beer : beer['type'].toLowerCase().includes(filters['type'].toLowerCase()))
                            .filter(beer => filters['gloablRatingScore'] === undefined ? beer : beer['gloablRatingScore'] >= filters['gloablRatingScore'])
                            .filter(beer => filters['minAbv'] === undefined ? beer : beer['abv'] >= filters['minAbv'])
                            .filter(beer => filters['maxAbv'] === undefined ? beer : beer['abv'] <= filters['maxAbv'])
                            .filter(beer => filters['minIbu'] === undefined ? beer : beer['ibu'] >= filters['minIbu'])
                            .filter(beer => filters['maxIbu'] === undefined ? beer : beer['ibu'] <= filters['maxIbu'])

    }

    if (beerList.length === 0 ) {

        throw new Error('No beers found with that filter');
    } 
    else {
        return Promise.resolve(beerList);
    }



}

const createBeer = (name, breweryName,
    type, abv, ibu, untappdWebsite, breweryUrl,
    breweryCountry, breweryCity, breweryState,
    flavorProfiles, servingType, bid, breweryId,
    gloablRatingScore, venueName) => {
        
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
        if (typeof servingType !== 'string' || servingType.trim() === '' || !SERVING_TYPES.includes(servingType)) throw new Error('servingType must be a non-empty string within valid types');
        if (typeof bid !== 'string' || bid.trim() === '') throw new Error('bid must be a non-empty string');
        if (typeof breweryId !== 'string' || breweryId.trim() === '') throw new Error('breweryId must be a non-empty string');
        if (typeof gloablRatingScore !== 'number' || gloablRatingScore < 0 || gloablRatingScore > 5) throw new Error('globalRatingScore must be a number between 0 and 5');

        const newBeer = {
            _id: (fakeBeers.length + 1).toString(),
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
            gloablRatingScore
        }

        fakeBeers.push(newBeer);
        
        return Promise.resolve(getBeerById(newBeer["_id"]));



    }

module.exports = {
    getBeerById,
    getBeerByName,
    getAllBeers, 
    addBeerToVenue, 
    getBeersByFilter, 
    createBeer
}
