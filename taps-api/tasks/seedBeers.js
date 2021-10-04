const dataHelpers = require('../data');
const beersData = dataHelpers.beers;

const insertBeer = async (beer) => {
  const { name } = beer;
  try {
    await beersData.createBeer(name);
    console.log('inserted movie:', name);
  } catch (e) {
    console.log('ERROR:', e.message, 'for beer', name);
  }
};

(async () => {
  await insertBeer({name: 'Forkist Beer'});
})()