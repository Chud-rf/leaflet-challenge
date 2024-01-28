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
            let mag = features[i].properties.mag;
            let markerSize = setSizeByMagnitude(mag);
            // console.log(markerSize);
            
            // Create marker
            L.circleMarker(markerCoordinates, {
                radius: markerSize * 3,
                color: markerColor,
                opacity: 1,
                borderColor: 'black'
            })
            .bindPopup(`<h2>${features[i].properties.place}</h2> <hr> 
            <h3>Magnitude: ${features[i].properties.mag}</h3>
            <h3>Depth: ${depth}</h3>
            `)
            .addTo(myMap);
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
    if (value < 0) {
        radius = 1
    }
    else if (value === 0) {
        radius = 2
    }
    else {
        radius = value * 2
    };
  
    return radius;
};

// Legend
// Legend help from: https://codepen.io/haakseth/pen/KQbjdO
let info = L.control({
    position: "bottomright"
});

info.onAdd = function() {
    let div = L.DomUtil.create("div", "legend");
    div.innerHTML += '<i style="background: #66FF00"></i><span>-10-10</span><br>';
    div.innerHTML += '<i style="background: #CCFF00"></i><span>10-30</span><br>';
    div.innerHTML += '<i style="background: #FFEE00"></i><span>30-50</span><br>';
    div.innerHTML += '<i style="background: #FFAA00"></i><span>50-70</span><br>';
    div.innerHTML += '<i style="background: #FF3300"></i><span>70-90</span><br>';
    div.innerHTML += '<i style="background: #FF0000"></i><span>90+</span><br>';
    return div;
};

info.addTo(myMap);
