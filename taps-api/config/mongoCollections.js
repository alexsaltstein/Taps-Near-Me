const dbConnection = require('./mongoConnection');

const getCollectionFn = (collection) => {
  let col;

  return async () => {
    if (!col) {
      const db = await dbConnection.connectDb();
      col = db.collection(collection);
    }

    return col;
  };
};

/* Now, you can list your collections here: */
module.exports = {
  beers: getCollectionFn('beers'),
};
