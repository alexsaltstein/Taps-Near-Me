//import { getBeerById } from "./beers";
const venuesMod = require('./venues');
const axios = require('axios');
const uuid = require('uuid');
const { beers, venues } = require('../config/mongoCollections');
const { SERVING_TYPES } = require('./consts');
const { isValidimgURL, isValidURL } = require('./utils');
const { getVenueByName, getVenueById, createVenue } = require('./venues');
const mongoCollections = require('../config/mongoCollections');
const { MongoClient } = require('mongodb')

//const { beers, venues } = mongoCollections;

//const { render, screen, waitFor } = require('@testing-library/react');

//jest.mock('../config/mongoCollections');

jest.mock('./venues')

describe('test get venues by ID', () => {

    test('output the venues by their ID', async () => {
        getVenueById('1').then(result => {
            expect(result["_id"]).toBe('1');
        });
    });

    test('output error - no input', async() => {
        expect(() => getVenueById(null)).toThrow("No id provided");
    });

    test('output error - not found', async() => {
        expect(() => getVenueById('0')).toThrow("No venue found with that id");
    });


});

describe('test get venues by name', () => {

    test('output the venues by their name', async () => {
        getVenueByName('Thatcher').then(result => {
            expect(result["name"]).toBe('Thatcher');
        });
    });

    test('output error - no input', async() => {

        expect(() => getVenueByName(null)).toThrow("No name provided");
        
    });

    test('output error - not found', async() => {

        expect(() => getVenueByName('Foo')).toThrow("No venue found with that name");
        
    });
});

describe('test the createVenue function', () => {

    test('add new venue successfully', async () => {
        createVenue('My Bar', 'Hoboken', 'NJ', 'USA', '41.0000', '70.0000').then(result => {
            expect(result['_id'].toBe('4'));
        });
    });
});