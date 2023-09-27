# leaflet-challenge

This repository contains JavaScript code for creating an interactive map that visualizes
earthquake data using Leaflet and D3.js. The interative map shows earthquake locations,
magnitude represented by the size of the circle markers (the larger the cirlce the stronger the 
magnitude), and the depth of the earthquake represented by the color of the circle marker (the
darker the color, the greater depth).

Features
Fetches GeoJSON earthquake data from the USGS API for the past 7 days.
Creates circle markers for each earthquake with size based on magnitude and color based on depth.
Pop-up information for each earthquake displays location and time.
Allows users to toggle between different map layers (Street Map and Topographic Map).
Includes a legend that represents the color-coding of earthquake depths.

Usage
Clone this repository to your local machine.
Open the index.html file in your web browser to view the earthquake map.
Customize the map to be street or topographic as well as add and remove the markers.

Code Structure
The code is organized into separate functions for readability and maintainability.
Modern JavaScript (ES6) syntax is used for variable declarations and functions.
Leaflet and D3.js libraries are utilized for map creation and data visualization.
The code is divided into three main sections: data retrieval, marker creation, and map rendering.

Dependencies
Leaflet.js: https://leafletjs.com/
D3.js: https://d3js.org/

Credits
This project uses earthquake data from the United States Geological Survey (USGS).

