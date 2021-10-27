// input is a string of 5 numbers, output is [lng, lat]
function getcoordsfromzip(zipcode) {
    const zip_check = zipcode.split('');
    for (let i = 0; i < zip_check.length; i++) {
        const int_check = parseInt(zip_check[i]);
        if (isNaN(int_check)) throw 'zipcode input must be all numbers!';
    }
    if (zipcode.length != 5) throw 'zipcodes must be exctly 5 numbers!';
    const request = require('request');
    const myurl = `https://thezipcodes.com/api/v1/search?zipCode=${zipcode}&countryCode=US&apiKey=c4a8ff48034211a8405535018b50ad89`
    request(myurl, { json: true }, (err, res, body) => {
	if (err) { return console.log(err); }
    const lng = parseFloat(body.location[0].longitude);
    const lat = parseFloat(body.location[0].latitude);
    const location = [lng,lat]
    return location;
});
}