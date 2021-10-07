"""
Module for:
1)loading untappd data
2)cleaning untappd data
3)splitting cleaned data
"""

from typing import List, Dict, IO
import json
import os

def clean_beer_data(beer_data_file, cleaned_data_file):

    """ Clean the craft beer data in the folder and create cleaned file """

    #props that are unwanted
    unwanted: List[str] = ['comment', 'rating_score','created_at','checkin_url','purchase_venue',
                            'checkin_id','photo_url','global_weighted_rating_score','tagged_friends',
                            'total_toasts','total_comments']

    #Note: rating_score is user rating -- not global rating 

    #change file directory

    os.chdir("C:/Users/ztyle/Documents/SSW 695/Taps-Near-Me/taps-api/sample-data")

    #load JSON data to dict

    fp: IO = open(beer_data_file, encoding="utf8")
    json_beer_data: List[Dict] = json.load(fp) 

    #iterate through JSON and only include wanted columns

    for beer in json_beer_data:

        for key in dict(beer).keys():

            if key in unwanted:

                beer.pop(key)

    #remove beers that are from Untappd at home or venue is None 

    json_beer_data: List[Dict] = [beer for beer in json_beer_data if beer['venue_name'] not in ['Untappd at Home', None, '']]

    #load (dump) data into new json file

    new_file = open(cleaned_data_file, "w")

    json.dump(json_beer_data, new_file, skipkeys=False, ensure_ascii=True, check_circular=True, allow_nan=True, cls=None, indent=6, separators=None, default=None, sort_keys=False)

    new_file.close()


def get_beer_data(cleaned_beer_data_file, beer_only_data_file):

    """ Get the beer data separated from the file """

    #open beer file and create beer info list 
    fp: IO = open(cleaned_beer_data_file, encoding="utf8")
    json_beer_data = json.load(fp)
    beer_info = list()
    
    #create and append new dictionary for each beer 
    for beer in json_beer_data:
        
        beer_dict = dict()

        beer_dict['name'] = beer['beer_name']
        beer_dict['brewery_name'] = beer['brewery_name']
        beer_dict['type'] = beer['beer_type']
        beer_dict['abv'] = beer['beer_abv']
        beer_dict['ibu'] = beer['beer_ibu']
        beer_dict['untappd_website'] = beer['beer_url']
        beer_dict['brewery_country'] = beer['brewery_country']
        beer_dict['brewery_city'] = beer['brewery_city']
        beer_dict['brewery_state'] = beer['brewery_state']
        beer_dict['flavor_profiles'] = beer['flavor_profiles']
        beer_dict['serving_type'] = beer['serving_type']
        beer_dict['bid'] = beer['bid']
        beer_dict['brewery_id'] = beer['brewery_id']
        beer_dict['global_rating_score'] = beer['global_rating_score']
        beer_dict['venue_name'] = beer['venue_name']

        for beer in beer_info:

            if not(beer_dict['name'] == beer['venue_name'] and beer_dict['brewery_name'] == beer['brewery_name']):

                beer_info.append(beer)

    #load (dump) data into new json file

    new_file = open(beer_only_data_file, "w")

    json.dump(beer_info, new_file, skipkeys=False, ensure_ascii=True, check_circular=True, allow_nan=True, cls=None, indent=6, separators=None, default=None, sort_keys=False)

    new_file.close()

def get_venue_data(cleaned_beer_data_file, venue_only_data_file):

    """ Get the venue data separated from the file """

    #open beer file and create beer info list 
    fp: IO = open(cleaned_beer_data_file, encoding="utf8")
    json_beer_data = json.load(fp)
    venue_info = list()
    
    #create and append new dictionary for each beer 
    for beer in json_beer_data:
        
        venue_dict = dict()

        venue_dict['name'] = beer['venue_name']
        venue_dict['city'] = beer['venue_city']
        venue_dict['state'] = beer['venue_state']
        venue_dict['country'] = beer['venue_country']
        venue_dict['lat'] = beer['venue_lat']
        venue_dict['lng'] = beer['venue_lng']

        for venue in venue_info:

            if not(venue_dict['name'] == venue['venue_name'] and venue_dict['city'] == venue['city'] and venue_dict['state'] == venue['state'] and venue_dict['city'] == venue['city']):

                venue_info.append(venue)

    #load (dump) data into new json file

    new_file = open(venue_only_data_file, "w")

    json.dump(venue_info, new_file, skipkeys=False, ensure_ascii=True, check_circular=True, allow_nan=True, cls=None, indent=6, separators=None, default=None, sort_keys=False)

    new_file.close()

"""
clean_beer_data('untappd-data-json.json', 'cleaned-untappd-data-json.json')
get_beer_data('cleaned-untappd-data-json.json', 'cleaned-beer-data-json.json')
get_venue_data('cleaned-untappd-data-json.json', 'cleaned-venue-data-json.json')
"""







    