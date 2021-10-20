const dataHelpers = require('../data');
const venuesData = dataHelpers.venues;

const insertVenue = async (venue) => {
  const { name, city, state, country, lat, lng,} = venue;
  try {
    await venuesData.createVenue(name, city, state, country, lat, lng,);
    console.log('inserted venue:', name);
  } catch (e) {
    console.log('ERROR:', e.message, 'for venue', name);
  }
};

const seedAllVenues = async (data) => {
  console.log(`--- Seeding venues with ${data.length} records ---`);
  for (let venue of data){
    await insertVenue(venue);
  }
  console.log(`--- Completed seeding ${data.length} venues ---`);
  process.exit(0);
}

seedAllVenues(require('../sample-data/cleaned-venue-data-json.json'));