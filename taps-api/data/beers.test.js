//import { getBeerById } from "./beers";
const beersMod = require('./beers');
const axios = require('axios');
const uuid = require('uuid');
const { beers, venues } = require('../config/mongoCollections');
const { SERVING_TYPES } = require('./consts');
const { isValidimgURL, isValidURL } = require('./utils');
const { getVenueByName, getVenueById } = require('./venues');
const mongoCollections = require('../config/mongoCollections');
const { getBeerById, getBeerByName } = require('./beers');
const { MongoDBNamespace, MongoClient } = require('mongodb');

//const { beers, venues } = mongoCollections;

//const { render, screen, waitFor } = require('@testing-library/react');


//jest.mock('../config/mongoCollections');

jest.mock('./beers')

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

