from typing import List, Dict
import json

#props that are unwanted
unwanted: List[str] = ['comment', 'rating_score','created_at','checkin_url','purchase_venue',
                        'checkin_id','photo_url','global_weighted_rating_score','tagged_friends',
                        'total_toasts','total_comments']

#Note: rating_score is user rating -- not global rating 

#initiate new python file name 
new_file: str = ""

#input file directory

#load JSON data to dict

fp = open("untappd-data-json.json", encoding="utf8")
json_beer_data: Dict[str,str] = json.load(fp) 

#iterate through JSON and only include wanted columns

for beer in json_beer_data:

    for key in dict(beer).keys():

        if key in unwanted:

            beer.pop(key)

#remove beers that are from Untappd at home or venue is None 

json_beer_data = [beer for beer in json_beer_data if beer['venue_name'] not in ['Untappd at Home', None, '']]

#write to new file