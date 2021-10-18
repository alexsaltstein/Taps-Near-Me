const dataHelpers = require('../data');
const beersData = dataHelpers.beers;

const insertBeer = async (beer) => {
  const { name, brewery_name,
    type, abv, ibu, untappd_website, brewery_url,
    brewery_country, brewery_city, brewery_state,
    flavor_profiles, serving_type, bid, brewery_id,
    global_rating_score, venue_name } = beer;
  try {
    await beersData.createBeer(name, brewery_name,
      type, abv, ibu, untappd_website, brewery_url,
      brewery_country, brewery_city, brewery_state,
      flavor_profiles, serving_type, bid, brewery_id,
      global_rating_score, venue_name);
    console.log('inserted beer:', name);
  } catch (e) {
    console.log("ERROR:", e.message, "for", name);
  }
};

const seedAllBeers = async (data) => {
  console.log(`--- Seeding beers with ${data.length} records ---`);
  for (let beer of data){
    await insertBeer(beer);
  }
  console.log(`--- Completed seeding ${data.length} beers ---`);
  process.exit(0);
}

seedAllBeers(require('../sample-data/cleaned-beer-data-json'));
