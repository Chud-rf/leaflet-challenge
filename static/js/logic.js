// Save URL
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Create a map object.
let myMap = L.map("map", {
    center: [39.742043, -104.991531],
    zoom: 5
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


d3.json(url).then(function(response) {

    console.log(response);
    let features = response.features;

    for (let i = 0; i < features.length; i++) {
        let location = features[i].geometry;
        if (location) {
            // Coords variable
            let markerCoordinates = [location.coordinates[1], location.coordinates[0]];

            // Depth variable & set color
            let depth = location.coordinates[2];
            let markerColor = setColorByDepth(depth);

            // Magnitude variable
            let markerSize = features[i].properties.mag;
            console.log(markerSize);
            
            // Create marker
            L.circleMarker(markerCoordinates, {
                radius: markerSize * 3,
                color: markerColor,
                opacity: 0.75
            }).addTo(myMap);
        };
    };
});


// Earthquake color by depth
function setColorByDepth(value) {
    if (value > 90) {
      color = '#FF0000'
    }
    else if (value > 70) {
      color = '#FF3300'
    }
    else if (value > 50) {
      color = '#FFAA00'
    }
    else if (value > 30) {
        color = '#FFEE00'
      }
    else if (value > 10) {
    color = '#CCFF00'
    }
    else {
      color = '#66FF00'
    };
  
    return color;
};

// Earthquake color by depth
function setSizeByMagnitude(value) {
    if (value > 90) {
      radius = '#FF0000'
    }
    else if (value > 70) {
      radius = '#FF3300'
    }
    else if (value > 50) {
      radius = '#FFAA00'
    }
    else if (value > 30) {
    radius = '#FFEE00'
    }
    else if (value > 10) {
    color = '#CCFF00'
    }
    else {
      color = '#66FF00'
    };
  
    return color;
};