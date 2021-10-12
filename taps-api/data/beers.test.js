//import { getBeerById } from "./beers";
const beersMod = require('./beers');
const axios = require('axios');
const uuid = require('uuid');
const { beers, venues } = require('../config/mongoCollections');
const { SERVING_TYPES } = require('./consts');
const { isValidimgURL, isValidURL } = require('./utils');
const { getVenueByName, getVenueById } = require('./venues');
const mongoCollections = require('../config/mongoCollections');

//const { beers, venues } = mongoCollections;

//const { render, screen, waitFor } = require('@testing-library/react');



const fakeBeers = [
    {
        "_id": "51d6d03b-f243-4a1c-bb8e-f3297f01043d", 
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
    }
]



describe('test get beers by ID', () => {
    test('output the beers by their ID', async () => {
        const beerResults = await beersMod.getBeerById("51d6d03b-f243-4a1c-bb8e-f3297f01043d");
        expect(beerResults).toStrictEqual(fakeBeers[0]);
    });

    test('output an error if no id input is given', async() => {
        try {
            await beersMod.getBeerById(null);
        } catch (e) {
            expect(e.message).toEqual('No id provided');
        }
    });

    test('output an error if id not found', async() => {
        try {
            await beersMod.getBeerById('0');
        } catch (e) {
            expect(e.message).toEqual('No beer found with that id');
        }
    });
});

describe('test get beers by name', () => {
    test('output the beers by their name', async () => {
        const beerResults = await beersMod.getBeerByName('Stella Artois');
        expect(beerResults).toStrictEqual(fakeBeers[0]);
    });

    test('output an error if no name input is given', async() => {
        try {
            const beerResults = await beersMod.getBeerByName(null);
        } catch (e) {
            expect(e.message).toEqual('No name provided');
        }
    });

    test('output an error if name not found', async(done) => {
        try {
            await beersMod.getBeerByName('Water');
        } catch (e) {
            expect(e.message).toEqual('No beer found with that name');
            
        }
    });
});