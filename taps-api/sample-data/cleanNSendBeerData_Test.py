
import os
import unittest
from cleanNSendBeerData import clean_beer_data
import json
from typing import List, Dict, IO

class CleanBeerDataTest(unittest.TestCase):

    def test_remove_columns(self):

        """ Test that the correct columns were removed """

        #props that are unwanted
        unwanted: List[str] = ['comment', 'rating_score','created_at','checkin_url','purchase_venue',
                            'checkin_id','photo_url','global_weighted_rating_score','tagged_friends',
                            'total_toasts','total_comments']

        clean_beer_data("untappd-data-json_test2.json", "cleaned-untappd-data-json_test1.json")

        file2: IO = open("cleaned-untappd-data-json_test1.json", encoding="utf8")
        json_file2: List[Dict] = json.load(file2) 

        find_unwanted: bool = False

        for beer in json_file2:

            for key in beer.keys():

                if key in unwanted:

                    find_unwanted = True
                    break

        file2.close()
        
        self.assertFalse(find_unwanted)

  
    def test_remove_data_none(self):
        
        """ Test that the data is removed, expecting no data to be removed """
        
        clean_beer_data("untappd-data-json_test2.json", "cleaned-untappd-data-json_test2.json")

        file2: IO = open("cleaned-untappd-data-json_test2.json", encoding="utf8")
        json_file2: List[Dict] = json.load(file2) 
        file2.close()

        self.assertEqual(len(json_file2), 5)

 
    def test_remove_data_all(self):

        """ Test that the data is removed, expecting all data to be removed """

        clean_beer_data("untappd-data-json_test1.json", "cleaned-untappd-data-json_test3.json")

        file2: IO = open("cleaned-untappd-data-json_test3.json", encoding="utf8") 
        json_file2: List[Dict] = json.load(file2)
        file2.close()

        self.assertEqual(len(json_file2), 0)



if __name__ == "__main__":

    unittest.main(exit=False, verbosity=2)

    

