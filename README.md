# Mapping Available City, County and State Geodata in Big Ten Academic Alliance Region
The primary purpose of this interactive map is to show what cities, counties and states [BTAA Geoportal](https://geo.btaa.org/) is pulling data from. The Python scripts are used to keep track of open data portals along with the number of total records and transform metadata file formats between CSV and JSON. 

There are two versions using different techniques: one is built upon **ArcGIS** applications while the other is based on open source JavaScript library **Leaflet**.

|                 | V1: ArcGIS                               | V2: Leaflet |
| --------------- | ---------------------------------------- | ----------- |
| How?            | ArcPy & ArcGIS API for Python            | Python      |
| Raw data format | Feature class                            | GeoJSON     |
| Outcome         | Shapefiles needs to be published on AGOL | GeoJSON     |

*<a href="https://yijingzhou33.github.io/BTAA_County_Map/leaflet/">Live Demo [Leaflet]</a>*
> Note that all the instructions is based on Leaflet version. 


#### How to use

1. Edit `allCities.csv`, `allCounties.csv` and `allStates.csv`
2. Run Python Scripts to produce `activeCities.json`, `activeCounties.json`, `activeStates.json` and `legend.json`
3. Push new changes to GitHub

## data folder

- ### CSV files - *allCities.csv & allCounties.csv & allStates.csv* 

  These spreadsheets (<a href="https://docs.google.com/spreadsheets/d/1LgSkQpP_Xy5_Rz-Qm8PWvCISv8fYbM5RptRleFaD-4Q/edit#gid=1072617325">Google Drive</a>) require regular maintenance. The schema borrows many fields from <a href="https://github.com/geoblacklight/geoblacklight/wiki/GeoBlacklight-1.0-Metadata-Elements">GeoBlacklight Metadata Elements, Version 1.0</a>. The main difference is that ***allCities.csv*** includes `bounding Box` used to calculate the coordinates of city position. 

- ### JSON - *counties.json & states.json* 

  It is formatted as GeoJSON to encode geographic data structures for all states and counties in Big Ten Academic Alliance Region.  

## Python Scripts

- ### harvest.ipynb [recommended]

  This script should be opened with Anaconda3 Jupyter Notebook (running on Python 3). It will produce 4 json files stored in **json folder**. Reference comments for further explanation. 

  ​	**1. activeCities.json**

  ​	**2. activeCounties.json**

  ​	**3. activeStates.json**

  ​	**4. legend.json**

- ### harvest.py





