require('dotenv').config();

const { MongoClient } = require('mongodb');

const settings = {
  mongoConfig: {
    serverUrl: process.env.MONGOURI,
    database: process.env.DATABASE,
  },
};

const fullMongoUrl = settings.mongoConfig.serverUrl;

let client;
const getClient = async () => {
  if (!client) {
    client = await MongoClient.connect(fullMongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  }
  return client;
};

let connection;
const connectDb = async () => {
  if (!connection) {
    const tclient = await getClient();
    connection = tclient.db(settings.mongoConfig.database);
  }
  return connection;
};

module.exports = {
  connectDb,
  getClient,
};
