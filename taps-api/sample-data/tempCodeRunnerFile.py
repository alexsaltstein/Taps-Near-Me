#load (dump) data into new json file

    new_file = open(venue_only_data_file, "w")

    json.dump(venue_info, new_file, skipkeys=False, ensure_ascii=True, check_circular=True, allow_nan=True, cls=None, indent=6, separators=None, default=None, sort_keys=False)

    new_file.close()