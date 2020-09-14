// Initialize the map and set its view to the center of BTAA states and a zoom level
var map = L.map('mapid').setView([41.45370952725294, -90.86426943538162], 5);

// Add a Mapbox Streets tile layer to the map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

// Define how the BTAA active counties look like
var activeStyle = {
    fillColor: '#0088ce',
    color: '#f2f2f2',
    weight: 1,
    fillOpacity: 1
};

// Set up the active counties popup format and the data fields it uses
function forEachFeature(feature, layer) {
    var popupContent = '<table><tr><td>County: <b>' +
        feature.properties.NAME +
        '</b></td></tr>' + '<tr><td>Search Link: <a href="' +
        feature.properties.link +
        '" target="_blank">View</a></td></tr></table>';
    if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
    }
    layer.bindPopup(popupContent);
}

// Retrieve the geojson data and add it to the layer
var active = new L.GeoJSON.AJAX('/active/active_20200913.json', { onEachFeature: forEachFeature, style: activeStyle });
active.addTo(map);

// Define how the BTAA states look like
var statesStyle = {
    fillColor: '#939598',
    color: '#f2f2f2',
    weight: 2,
    fillOpacity: 0.8
};

// Retrieve the geojson data and add it to the layer
var states = new L.GeoJSON.AJAX('states.json', { style: statesStyle });
states.addTo(map);