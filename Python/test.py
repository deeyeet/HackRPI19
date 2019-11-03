import requests
import urllib.request
import urllib.error
import json
import pathlib

states =  ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA","KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]
url = "http://data.orghunter.com/v1/charitysearch?user_key=51f12dbea013cc4fb813c27d2947c38d&state="

for state in states:
    newUrl = url +state
    try:
        response = requests.get(newUrl)

        # If the response was successful, no Exception will be raised
        response.raise_for_status()
    except urllib.error.HTTPError as http_err:
        print(f'HTTP error occurred: {http_err}')  # Python 3.6
    except Exception as err:
        print(f'Other error occurred: {err}')  # Python 3.6
    else:
        print('Success!')

    # Contains ten results
    allData = response.json()
    data = allData["data"]
    path = pathlib.Path("DisasterDonation/src/app/jsons/") / (state + ".txt")

    print(path)
    
    with path.open(mode='w') as output:
        json.dump(data, output)