// Define functions for setting marker size based on earthquake magnitude
let setSize = (magnitude) => magnitude * 15000;
// Define functions for choosing color based on earthquake depth
let chooseColor = (depth) => {
  if (depth <= 10) return "lime";
  else if (depth <= 30) return "greenyellow";
  else if (depth <= 50) return "yellow";
  else if (depth <= 70) return "orange";
  else if (depth <= 90) return "darkorange";
  else return "red";
};

// Create circle markers for each earthquake
let createMarker = (feature) => {
  let magnitude = feature.properties.mag;
  let depth = feature.geometry.coordinates[2];

  return L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
    color: "black",
    fillColor: chooseColor(depth),
    radius: setSize(magnitude),
    opacity: 1,
    weight: 1,
    fillOpacity: 0.5,
  }).bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
};

// Fetch GeoJSON data and create the map
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(link).then((data) => {
  let markers = data.features.map(createMarker);
  createMap(markers);
});

// Create the base maps
let createMap = (markers) => {
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };
// set the overlay layer
  let overlayMaps = {
    Earthquakes: L.layerGroup(markers)
  };
// set the div to place map and the coordinates of center/zoom level
  let map = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4.5,
    layers: [street, L.layerGroup(markers)]
  });
// add layers to map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
// create the legend to add to map
  const legend = L.control({ position: "bottomright" });
  legend.onAdd = () => {
    const div = L.DomUtil.create("div", "info legend");
    const depth = [-10, 10, 30, 50, 70, 90];

    for (let i = 0; i < depth.length; i++) {
      div.innerHTML +=
        `<i style="background:${chooseColor(depth[i] + 1)}"></i> ${depth[i]}${depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+'}`;
    }
    return div;
  };
  legend.addTo(map);
};
