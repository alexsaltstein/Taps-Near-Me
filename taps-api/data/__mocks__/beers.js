// const uuid = require('uuid');
// const mongoCollections = require('../config/mongoCollections');
// const { SERVING_TYPES } = require('./consts');
// const { isValidimgURL, isValidURL } = require('./utils');
// const { getVenueByName, getVenueById } = require('./venues');
//const { getBeerById } = require('./beers')

//const { beers, venues } = mongoCollections;

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
]

const getBeerById = (id) => {
    if (id === null) {
        throw new Error("No id provided");
        return Promise.reject()
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
        return Promise.reject()
    }
    else {
        for (let i = 0; i < fakeBeers.length; i++) {
            if (fakeBeers[i]["name"] === name) {
                return Promise.resolve(fakeBeers[i]);
            }
        }

        throw new Error("No beer with that name found");
        return Promise.reject();
    }
}

module.exports = {
    getBeerById,
    getBeerByName
}
