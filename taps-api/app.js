const express = require('express');
const bodyParser = require('body-parser');
const configRoutes = require('./routes');

const app = express();

require('dotenv').config();

app.use(express.static('public'));

app.use(bodyParser.json());
configRoutes(app);

module.exports = app;
