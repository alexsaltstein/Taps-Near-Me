//import { getBeerById } from "./beers";
const venuesMod = require('./venues');
const axios = require('axios');
const uuid = require('uuid');
const { beers, venues } = require('../config/mongoCollections');
const { SERVING_TYPES } = require('./consts');
const { isValidimgURL, isValidURL } = require('./utils');
const { getVenueByName, getVenueById } = require('./venues');
const mongoCollections = require('../config/mongoCollections');

//const { beers, venues } = mongoCollections;

//const { render, screen, waitFor } = require('@testing-library/react');

const fakeVenues = [
    {
        "_id":"1477a7e1-45d9-414f-a4bb-c294e08a90d0",
        "name":"Thatcher McGhee's",
        "city":"Pompton Lakes",
        "state":"NJ",
        "country":"United States",
        "lat":"41.0076",
        "lng":"-74.2951",
        "beersAvailable":["51d6d03b-f243-4a1c-bb8e-f3297f01043d"]
    }
];

//jest.mock('../config/mongoCollections');



describe('test get venues by ID', () => {
    test('output the venues by their ID', async () => {
        const venueResults = await venuesMod.getVenueById("1477a7e1-45d9-414f-a4bb-c294e08a90d0");
        expect(venueResults).toStrictEqual(fakeVenues[0]);
    });

    test('output an error if no id input is given', async() => {
        try {
            await venuesMod.getVenueById(null);
        } catch (e) {
            expect(e.message).toEqual('No id provided');
        }
    });

    test('output an error if id not found', async() => {
        try {
            await venuesMod.getVenueById('Foo Place');
        } catch (e) {
            expect(e.message).toEqual('No venue found with that id');
        }
    });


});

describe('test get venues by name', () => {
    test('output the venues by their name', async () => {
        const venuesResults = await venuesMod.getVenueByName('Thatcher McGhee\'s');
        expect(await venuesResults).toStrictEqual(fakeVenues[0]);
    });

    test('output an error if no name input is given', async() => {

        try {
            await venuesMod.getVenueByName(null);
        } catch (e) {
            expect(e.message).toEqual('No name provided');
        }
        
    });

    test('output an error if name not found', async() => {

        try {
            await venuesMod.getVenueByName('Foo Place');
        } catch (e) {
            expect(e.message).toEqual('No venue found with that name');
        }
    });
});