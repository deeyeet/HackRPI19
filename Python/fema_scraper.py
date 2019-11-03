import requests
import urllib.request
import urllib.error
from datetime import datetime

url = "https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries?"
select = "$select=state,declarationDate,incidentType,title,incidentBeginDate,incidentEndDate,disasterCloseOutDate,declaredCountyArea"
orderby = "&$orderby=declarationDate desc"

filterUrl = "&$filter=incidentBeginDate ge "
currentYear = datetime.now().year
fiveYearsBack = currentYear - 5
filterUrl += "\'" + str(fiveYearsBack) + "-01-01T04:00:00.000z\'"

url += select + orderby + filterUrl 

# top = "&$top=100"
# incr = 0

# url += top

# Contains all the data with no disasterCloseOutDate

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

# Contains ten results
allData = response.json()

# Filter out the metadata
mainData = allData['DisasterDeclarationsSummaries']

print(mainData)
    
