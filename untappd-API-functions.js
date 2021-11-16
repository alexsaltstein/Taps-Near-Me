const baseurl = 'https://api.untappd.com/v4';
const cid = 'client_id=BB6DF6FBC4C3225508CC10AAB632AF2EAB7ADFCA&';
const csec = 'client_secret=C6312407CE787B516BEF3D91222807F05B5F7CE8';
const axios = require('axios');

async function getBeerById (bid) {
    if (!bid) throw 'must provide a beer id';
    if (typeof bid != 'string' || bid.trim().length === 0) throw 'beer id must be a non-empty string';
    const url = baseurl + '/beer/info/' + bid + '?' + cid + csec;
    console.log(url);
    const result = await axios.get(url);
    if (result.developer_friendly) {
        return result.developer_friendly;
    };
    const beer_result = result.data.response.beer;
    const beer = {
        Name: beer_result.beer_name,
        Label: beer_result.beer_label_hd,
        Description: beer_result.beer_description,
        ABV: beer_result.beer_abv,
        IBU: beer_result.beer_ibu,
        Style: beer_result.beer_style,
        Rating: beer_result.rating_score
    }
    return beer;
};

async function getVenueById (vid) {
    if (!vid) throw 'must provide a venue id';
    if (typeof vid != 'string' || vid.trim().length === 0) throw 'venue id must be a non-empty string';
    const url = baseurl + '/venue/info/' + vid + '?' + cid + csec;
    console.log(url);
    const result = await axios.get(url);
    if (result.developer_friendly) {
        return result.developer_friendly;
    };
    const venue_result = result.data.response.venue;
    const venue = {
        Name: venue_result.venue_name,
        Location: {
            City: venue_result.location.venue_city,
            State: venue_result.location.venue_state,
            Country: venue_result.location.venue_country,
            Coordinates: {
                lat: venue_result.location.lat,
                lng: venue_result.location.lng
            }
        },
        Twitter: venue_result.contact.twitter,
        Wesbite: venue_result.contact.venue_url,
        Facebook: venue_result.contact.facebook,
        Yelp: venue_result.contact.yelp,
    }
    return venue;
};