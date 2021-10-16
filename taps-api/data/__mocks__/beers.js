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

const getBeerById = (id) => {
    if (id === null) {
        Promise.reject(new Error("No id provided"));
        throw new Error("No id provided");
    }
    else {
        for (let i = 0; i < fakeBeers.length; i++) {
            if (fakeBeers[i]["_id"] === id) {
                return Promise.resolve(fakeBeers[i]);
            }
        }
        Promise.reject(new Error("No beer with that id found"));
        throw new Error("No beer with that id found")
    }
}

const getBeerByName = (name) => {
    if (name === null) {
        Promise.reject(new Error("No name provided"));
        throw new Error("No name provided");
        
    }
    else {
        for (let i = 0; i < fakeBeers.length; i++) {
            if (fakeBeers[i]["name"] === name) {
                console.log(fakeBeers[i]["name"])
                return Promise.resolve(fakeBeers[i]);
            }
        }
        Promise.reject(new Error("No beer with that name found"));
        throw new Error("No beer with that name found");
        
    }
}

const getAllBeers = (beers) => {
    if (beers.length === 0) {
        Promise.reject(new Error("No beers found"));
        throw new Error("No beers found");
    }
    else {
        return Promise.resolve(beers);
    }
}

const addBeerToVenue = (venueName, beerId) => {
    if(venueName === null) {
        Promise.reject(new Error("No name provided"));
        throw new Error("No name provided");
    }
    else if (beerId === null) {
        Promise.reject();
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
        
        console.log(typeof venue["beersAvailable"]);
        console.log(beer["_id"]);
        

        if (venue['beersAvailable'].includes(beer["beerId"])) {
            Promise.reject();
            throw new Error('Failed to add beer to venue');
        }
        else {
            venue["beersAvailable"].push(beer["beerId"]);
            return Promise.resolve(getVenueById(venue["_id"]));
        }

    }
}

module.exports = {
    getBeerById,
    getBeerByName,
    getAllBeers, 
    addBeerToVenue
}
