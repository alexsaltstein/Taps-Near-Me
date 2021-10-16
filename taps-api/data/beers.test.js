//import { getBeerById } from "./beers";
const beersMod = require('./beers');
const axios = require('axios');
const uuid = require('uuid');
const { beers, venues } = require('../config/mongoCollections');
const { SERVING_TYPES } = require('./consts');
const { isValidimgURL, isValidURL } = require('./utils');
const { getVenueByName, getVenueById } = require('./venues');
const mongoCollections = require('../config/mongoCollections');
const { getBeerById, getBeerByName, getAllBeers, addBeerToVenue } = require('./beers');
const { MongoDBNamespace, MongoClient } = require('mongodb');

//const { beers, venues } = mongoCollections;

//const { render, screen, waitFor } = require('@testing-library/react');


//jest.mock('../config/mongoCollections');

jest.mock('./beers');
jest.mock('./venues')

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

const emptyBeers = [];

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
            expect(result.length).toBe(4);
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

