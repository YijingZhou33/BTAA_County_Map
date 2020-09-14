import json
import pandas as pd

######################################

### Manual items to change!

## set the date updating the counties
ActionDate = '20200913'

## names of the main directory containing Geoportal.csv and active folder
## Windows:
directory = r'C:\Users\Zhouy\Desktop\BTAA_County Map\leaflet'
## MAC or Linux:
## directory = 'C:\Users\Zhouy\Desktop\BTAA_County Map\leaflet'
######################################

active = directory + '\\active\\active_%s.json' % (ActionDate)

# Convert the csv file into a dictionary
# Set the county FIP as key and search page as value
d = pd.read_csv('Geoportal.csv', index_col=0, squeeze=True).to_dict()
keys_values = d.items()
activeDic = {str(key): str(value) for key, value in keys_values}

with open('counties.json', 'r') as f:
    data = json.load(f)

# Create a new dictionary only containing counties with search links
activeJSON = {'type':'FeatureCollection'}
activeJSON['features'] = []

features = data['features']
for feature in features:
    prop = feature['properties']
    # Compare the FIPs 
    for key in activeDic:
        if prop['FIPS'] == key:
            prop['link'] = activeDic[key]
            activeJSON['features'].append(feature)

with open(active, 'w') as f:
    json.dump(activeJSON, f)