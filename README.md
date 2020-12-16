# BTAA County Map

The primary purpose of this interactive map is to show what states and counties [BTAA Geoportal](https://geo.btaa.org/) is pulling data from. Ideally it will be incorporated into the geoportal itself to be used as an alternative spatial search tool. 

There are two versions using different techniques: one is built upon **ArcGIS** applications while the other is based on open source JavaScript library **Leaflet**.



## Functionality

### 1. Automating the data updating process

One of the key tasks is to keep the updating process simple. Therefore, users only needs to keep track of the **Geoportal.csv** storing counties' FIPs and search links. 

|                 | V1: ArcGIS                               | V2: Leaflet |
| --------------- | ---------------------------------------- | ----------- |
| How?            | ArcPy & ArcGIS API for Python            | Python      |
| Raw data format | Feature class                            | GeoJSON     |
| Outcome         | Shapefiles needs to be published on AGOL | GeoJSON     |

### 2. Mapmaking

The version 1 utilizes the **ArcGIS API for JavaScript** to display the areas while the version 2 uses the **Leaflet** library. Users will be relocated to the landing page via popup. 



## Getting started

To get started you could simply clone the repository and run a local testing server. 

1. Navigate to the directory that stores the repository

2. Open the *Powershell Prompt* and type in:

   `python -m SimpleHTTPServer 8000`

3. Go to the browser and type in the URL `https://localhost:8000`

