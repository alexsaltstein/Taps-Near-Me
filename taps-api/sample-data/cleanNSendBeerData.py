"""
Module for:
1)loading untappd data
2)cleaning untappd data
3)storing cleaned untappd data
4)sending cleaned untappd data to db
"""

from typing import List, Dict, IO
import json
import os
from pymongo import MongoClient, InsertOne
import pymongo

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

def send_beer_data(cleaned_data):

    """ Sends the craft beer data to MongoDB """

    #initialize information about MongoDB database

    client: MongoClient = MongoClient("mongodb://localhost:3000")
    db = client.[DATABASE]
    collection = db.[beers]

    #push data

    with open(cleaned_data) as fp:

        beer_data: List[Dict] = json.load(fp)

    collection.insert_many(beer_data)

    client.close()