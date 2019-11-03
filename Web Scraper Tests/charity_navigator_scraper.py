import requests
import urllib.request
import urllib.error

url = "https://api.data.charitynavigator.org/v2/Organizations?app_id=750cc46d&app_key=10772636c310d4982e1a36919dbd2d12&search=Hurricane&searchType=NAME_ONLY"

try:
    response = requests.get(url)

    # If the response was successful, no Exception will be raised
    response.raise_for_status()
except urllib.error.HTTPError as http_err:
    print(f'HTTP error occurred: {http_err}')  # Python 3.6
except Exception as err:
    print(f'Other error occurred: {err}')  # Python 3.6
else:
    print('Success!')

d = response.json()
print(d)
