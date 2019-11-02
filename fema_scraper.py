import requests
import urllib.request
import urllib.error

url = "https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries?"
select = "$select=state,declarationDate,incidentType,title,incidentBeginDate,incidentEndDate,disasterCloseOutDate,declaredCountyArea"
top = "&$top=10"
orderby = "&$orderby=incidentBeginDate desc"

url += select
url += top
url += orderby


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