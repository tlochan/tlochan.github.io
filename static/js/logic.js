 let newYorkCoords = [40.73, -74.0059];
 let mapZoomLevel = 12;

// Create the createMap function.
function createMap () {
  // Create the map object with options.
  let myMap = L.map("map-id",{
    center: newYorkCoords,
    zoom:mapZoomLevel,
    layers: [lightmap, bikeStations]
  });
  // Create the tile layer that will be the background of our map.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);


  // Create a baseMaps object to hold the lightmap layer.
  let baseMaps = {
   // "lightmap":lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer.
  let overlapMaps = {
    "bikeStations":bikeStations
  };
  
  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps,overlapMaps).addTo(myMap);
};

// Create the createMarkers function.
function createMarkers(){
  // Pull the "stations" property from response.data.
  let url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"
  d3.json(url).then(function(data){
    let stations = data.data.stations;
    console.log(stations);
  // Initialize an array to hold the bike markers.
    bikeMarkers = [];
  // Loop through the stations array.
    for (i=0;i<stations.length;i++){
      // For each station, create a marker, and bind a popup with the station's name.
      let station = stations[i];
      let lat = station.lat;
      let lon = station.lon;
      
      // Add the marker to the bikeMarkers array.
      bikeMarkers.push([lat,lon]);
    };
    console.log(bikeMarkers);
    let bikeStations = L.layerGroup(bikeMarkers);

    

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  });
};
createMarkers();
createMap();
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
