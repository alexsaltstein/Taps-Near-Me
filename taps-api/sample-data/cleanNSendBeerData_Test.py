
import os
import unittest
from cleanNSendBeerData import clean_beer_data, get_beer_data, get_venue_data
import json
from typing import List, Dict, IO

class CleanBeerDataTest(unittest.TestCase):

    def test_remove_columns(self):

        """ Test that the correct columns were removed """

        #props that are unwanted
        unwanted: List[str] = ['comment', 'rating_score','created_at','checkin_url','purchase_venue',
                            'checkin_id','photo_url','global_weighted_rating_score','tagged_friends',
                            'total_toasts','total_comments']

        clean_beer_data("untappd-data-json_test2.json", "cleaned-untappd-data-json-removed-cols.json")

        file2: IO = open("cleaned-untappd-data-json-removed-cols.json", encoding="utf8")
        json_file2: List[Dict] = json.load(file2) 

        find_unwanted: bool = False

        for beer in json_file2:

            for key in list(beer.keys()):

                if key in unwanted:

                    find_unwanted = True
                    break

        file2.close()
        
        self.assertFalse(find_unwanted)

  
    def test_remove_data_none(self):
        
        """ Test that the data is removed, expecting no data to be removed """
        
        clean_beer_data("untappd-data-json_test2.json", "cleaned-untappd-data-json-no-data-removed.json")

        file2: IO = open("cleaned-untappd-data-json-no-data-removed.json", encoding="utf8")
        json_file2: List[Dict] = json.load(file2) 
        file2.close()

        self.assertEqual(len(json_file2), 5)

 
    def test_remove_data_all(self):

        """ Test that the data is removed, expecting all data to be removed """

        clean_beer_data("untappd-data-json_test1.json", "cleaned-untappd-data-json-all-removed.json")

        file2: IO = open("cleaned-untappd-data-json-all-removed.json", encoding="utf8") 
        json_file2: List[Dict] = json.load(file2)
        file2.close()

        self.assertEqual(len(json_file2), 0)


class SplitCleanBeerDataTest(unittest.TestCase):

    def test_beer_data_cols(self):

        """ Test that the cleaned split beer data has the correct cols """

        beer_cols: List[str] = ['name','brewery_name','type','abv','ibu','untappd_website',
                                'brewery_country','brewery_city','brewery_state','flavor_profiles',
                                'serving_type','bid','brewery_id','global_rating_score','venue_name']

        get_beer_data("cleaned-untappd-data-json-test_1.json", "cleaned-beer-data-json-test-cols.json")

        file2: IO = open("cleaned-beer-data-json-test-cols.json", encoding="utf8")
        json_file2: List[Dict] = json.load(file2) 

        find_no_col: bool = False

        for beer in json_file2:

            for key in list(beer.keys()):

                if key not in beer_cols:
                    find_no_col = True
                    break

        file2.close()
        
        self.assertFalse(find_no_col, f"{key} is not in here")

    def test_venue_data_cols(self):

        """ Test that the cleaned split venue data has the correct cols """

        venue_cols: List[str] = ['name','country','state','lat','lng','city']

        get_venue_data("cleaned-untappd-data-json-test_2.json", "cleaned-venue-data-json-venue-cols.json")

        file2: IO = open("cleaned-venue-data-json-venue-cols.json", encoding="utf8")
        json_file2: List[Dict] = json.load(file2) 
        file2.close()

        not_in_cols: bool = False

        for venue in json_file2:

            for key in list(venue.keys()):

                if key not in venue_cols:

                    not_in_cols = True
                    break

        
        
        self.assertFalse(not_in_cols)

    def test_beer_data_dups(self):

        """ Test that the cleaned split beer data has no dups """

        get_beer_data("cleaned-untappd-data-json-test_3.json", "cleaned-beer-data-json-no-beer-dups.json")

        file2: IO = open("cleaned-beer-data-json-no-beer-dups.json", encoding="utf8")
        json_file2: List[Dict] = json.load(file2) 
        
        self.assertEqual(len(json_file2), 1)

    def test_venue_data_dups(self):

        """ Test that the cleaned split beer data has the correct cols """

        get_venue_data("cleaned-untappd-data-json-test_4.json", "cleaned-beer-data-json-no-venue-dups.json")

        file2: IO = open("cleaned-beer-data-json-no-venue-dups.json", encoding="utf8")
        json_file2: List[Dict] = json.load(file2) 

        self.assertEqual(len(json_file2), 1)

    



if __name__ == "__main__":

    unittest.main(exit=False, verbosity=2)

    

