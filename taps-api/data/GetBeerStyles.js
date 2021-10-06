const axios = require('axios');
// getBeers
async function getBeers() {
    const { data } = await axios.get("https://raw.githubusercontent.com/alexsaltstein/Taps-Near-Me/master/taps-api/sample-data/untappd-data-json.json");
    return data;
  }
// get all beer styles/types from dataset
async function beerStyles () {
    const beers = await getBeers();
    let styles = [];
    for (let i = 0; i < beers.length; i++) {
        styles.push(beers[i].beer_type)
    }
    let types = new Set(styles);
    return types;
}
async function main() {
    let result = await beerStyles();
    console.log(result);
}
main();