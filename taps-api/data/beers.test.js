//import { getBeerById } from "./beers";
const beersMod = require('./beers');
const axios = require('axios');
const uuid = require('uuid');
const { beers, venues } = require('../config/mongoCollections');
const { SERVING_TYPES } = require('./consts');
const { isValidimgURL, isValidURL } = require('./utils');
const { getVenueByName, getVenueById } = require('./venues');
const mongoCollections = require('../config/mongoCollections');
const { getBeerById, getBeerByName, getAllBeers, addBeerToVenue, getBeersByFilter, createBeer } = require('./beers');
const { MongoDBNamespace, MongoClient } = require('mongodb');

//const { beers, venues } = mongoCollections;

//const { render, screen, waitFor } = require('@testing-library/react');


//jest.mock('../config/mongoCollections');

jest.mock('./beers');
jest.mock('./venues')

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
        "abv": 6,
        "bid": "4010", 
        "breweryCity": "Leuven", 
        "breweryCountry": "Belgium", 
        "breweryId": "265", 
        "breweryName": "Artois Stella", 
        "breweryState": "Vlaanderen", 
        "breweryUrl": "https://untappd.com/brewery/265", 
        "flavorProfiles": "", 
        "gloablRatingScore": 3.60, 
        "ibu": "48", 
        "name": "Artois Stella", 
        "servingType": "Draft", 
        "type": "IPA - American", 
        "untappdWebsite": "https://untappd.com/beer/4010"
    },
    {
        "_id": "3", 
        "abv": 2.5, 
        "bid": "4010", 
        "breweryCity": "Leuven", 
        "breweryCountry": "Belgium", 
        "breweryId": "265", 
        "breweryName": "Stella Stella", 
        "breweryState": "Vlaanderen", 
        "breweryUrl": "https://untappd.com/brewery/265", 
        "flavorProfiles": "", 
        "gloablRatingScore": 3.26, 
        "ibu": 10, 
        "name": "Stella Stella", 
        "servingType": "Draft", 
        "type": "Sour - Gose", 
        "untappdWebsite": "https://untappd.com/beer/4010"
    }
];

const emptyBeers = [];

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

describe('test get beers by ID', () => {
    test('output the beers by their ID', async () => {
        getBeerById('1').then(result => {
            expect(result["_id"]).toBe('1');
        });
    });

    test('output an error if no id input is given', async() => {
        expect(() => getBeerById(null)).toThrow("No id provided");
    });

    test('output an error if id not found', async() => {
        expect(() => getBeerById('0')).toThrow("No beer with that id found");
    });
});

describe('test get beers by name', () => {
    test('output the beers by their name', async () => {
        getBeerByName('Stella Stella').then(result => {
            expect(result["name"]).toBe('Stella Stella');
        });
    });

    test('output an error if no name input is given', async() => {
        expect(() => getBeerByName(null)).toThrow("No name provided");
    });

    test('output an error if name not found', async() => {
        expect(() => getBeerByName('Water')).toThrow("No beer with that name found");
    });
});

describe('test get all beers', () => {

    test('get all beers', async () => {
        getAllBeers(fakeBeers).then(result => {
            expect(result.length).toBe(3);
        });
    });

    test('throw error when list is empty', async () => {

        expect(() => getAllBeers(emptyBeers).toThrow('No beers found'));
    })
});

describe('test add beer to venue', () => {

    test('add beer to venue', async () => {
        addBeerToVenue('Thatcher', '2').then(result => {
            expect(result["beersAvailable"].length).toBe(2);
        });
    });

    test('throw error if beer is in venue', async () => {
        expect(() => addBeerToVenue('Thatcher', '51d6d03b-f243-4a1c-bb8e-f3297f01043d').toThrow('Failed to add beer to venue'));
    });

    test('throw error if no name input', async () => {
        expect(() => addBeerToVenue(null, '1').toThrow('No name provided'));
    });

    test('throw error if no id input', async () => {
        expect(() => addBeerToVenue('Thatcher', null).toThrow('No id provided'));
    });
});

describe('test getting beers by filter', () => {

    test('get filtered beer list with one criterion', async () => {
        getBeersByFilter( {gloablRatingScore: 2 } ).then(result => {
            expect(result.length).toBe(1);  
        });
    });
});

describe('test creating a new beer', () => {

    test('create a new beer successfully', async () => {
        createBeer('Zach IPA','My Brewery', 'IPA - American', 5.5, 60, 'http://untappd.com/bid/fakeid', 
        'http://untappd.com/breweryid/foo', 'USA', 'New York City', 'NY', 'hoppy,smooth,bitter', 
        'Draft','29','12345',4.5,'My Brewery').then(result => {
            expect(result['_id']).toBe('4');
        });
    });
    

    test('throw error if input is a string when expecting a number', async () => {
        expect(() => createBeer('Zach IPA',1234, 'IPA - American', 5.5, 60, 'http://untappd.com/bid/fakeid', 
        'http://untappd.com/breweryid/foo', 'USA', 'New York City', 'NY', 'hoppy,smooth,bitter', 
        'Draft','29','12345',4.5,'My Brewery').toThrow('breweryName must be a non-empty string'))
    });

    test('throw error if input is a number when expecting a string', async () => {
        expect(() => createBeer('Zach IPA','My Brewery', 'IPA - American', '5.5', 60, 'http://untappd.com/bid/fakeid', 
        'http://untappd.com/breweryid/foo', 'USA', 'New York City', 'NY', 'hoppy,smooth,bitter', 
        'Draft','29','12345',4.5,'My Brewery').toThrow('abv must be a number greater than or equal to 0'));

    });

    test('throw error if numeric input is out of bounds', async () => {
        expect(() => createBeer('Zach IPA','My Brewery', 'IPA - American', -1, 60, 'http://untappd.com/bid/fakeid', 
        'http://untappd.com/breweryid/foo', 'USA', 'New York City', 'NY', 'hoppy,smooth,bitter', 
        'Draft','29','12345',4.5,'My Brewery').toThrow('abv must be a number greater than or equal to 0'));

    });

    test('throw error if empty string', async () => {
        expect(() => createBeer('Zach IPA','My Brewery', '', 5, 60, 'http://untappd.com/bid/fakeid', 
        'http://untappd.com/breweryid/foo', 'USA', 'New York City', 'NY', 'hoppy,smooth,bitter', 
        'Draft','29','12345',4.5,'My Brewery').toThrow('style must be a non=empty string'));
    });
});
