const dataHelpers = require('../data');
const venuesData = dataHelpers.venues;

const testGeojson = async () => {
 const venues = await venuesData.getVenuesByRadius(['-74.034775', '40.745255'], '5');

 console.log(venues);

}

testGeojson();