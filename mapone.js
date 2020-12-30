// map one upd Dec. 30, 2020
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpeWF1dGUiLCJhIjoiY2p5ZXp1b3ZyMDBpMTNjcjdnZ3dnbzJpYyJ9.UiTAUN2b8ASlVnMr_nmn3Q';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/aliyaute/ckhp5zhh72hvs19p9di978qoj',
    zoom: 6.40,
    center: [-105.99, 34.41],
    maxZoom:15,
    minZoom:6,
    fitBounds: [[-109.048428, 31.332406], [-103.000468, 37.000482]]
    // maxBounds: [[-109.2, 31.20], [-103, 37]]

});


// Zoom Button
map.addControl(new mapboxgl.NavigationControl());


map.on('load', function () {
    // This is the function that prints the layers' IDs to the console
    var layers = map.getStyle().layers;
    for (var i = 0; i < layers.length; i++) {
        console.log(layers[i].id);
    }    


//  add 1st map

    map.addLayer({
        'id': 'Poverty Level',
        'type': 'fill',
        'layout': {
            'visibility': 'visible'
        },
        'source': {
            'type': 'geojson',
            'data': 'data/upd_data122620.geojson'

        },

        'paint': {
            'fill-color': [
                'case', 
                ['==',['get', 'poverty_category'], 6], '#7f2704',
                ['==',['get', 'poverty_category'], 5], '#d94801',
                ['==',['get', 'poverty_category'], 4], '#fd8d3c',
                ['==',['get', 'poverty_category'], 3], '#fdae6b', 
                ['==',['get', 'poverty_category'], 2], '#fdd0a2',
                ['==',['get', 'poverty_category'], 1], '#fee8c8',
                // ['==',['get', 'Poverty_Category_Code'], 0], '#fee6ce',
                '#d3d3d3',
            ],
            // "fill-outline-color": "#ffffff"

         }
    }, 'landuse'); // Here's where we tell Mapbox where to slot this new layer

    map.addLayer({
        'id': 'states-layer-outline',
        'type': 'line',
        'layout': {
            'visibility': 'visible'
        },
        'source': {
          'type': 'geojson',
          'data': 'data/upd_data122620.geojson'
        },
        'paint': {
          'line-color': '#737373',
          'line-width': 0.6
        }
    }, 'landuse'); // Here's where we tell Mapbox where to slot this new layer
    

});




// Create the popup for 1st layer
map.on('click', 'Poverty Level', function (e) {
    var County = e.features[0].properties.County;
    var NAMELSAD = e.features[0].properties.NAMELSAD;
    // var Area = e.features[0].properties.Area;
    var Number_of_Cases = e.features[0].properties.Number_of_Cases;
    var percent = e.features[0].properties.percent;
    var Percentage_in_Poverty = e.features[0].properties.Percentage_in_Poverty;
    var Population_Size = e.features[0].properties.Population_Size;
    var Percent_White = e.features[0].properties.Percent_White;
    var Percent_Black = e.features[0].properties.Percent_Black;
    var Percent_AIAN = e.features[0].properties.Percent_AIAN;
    var Percent_Hispanic = e.features[0].properties.Percent_Hispanic;
    var Percent_Asian = e.features[0].properties.Percent_Asian;
    var Other_Percent = e.features[0].properties.Other_Percent;
    percent = (percent* 100).toFixed(1);
    if (percent < 1) {
        percent = "< 1";
      }
    if (Percent_Asian < 1) {
        Percent_Asian = "< 1";
      }
    if (Percent_AIAN < 1) {
        Percent_AIAN = "< 1";
      } 
    if (Percent_Hispanic < 1) {
        Percent_Hispanic = "< 1";
      }  
    if (Percent_Black < 1) {
        Percent_Black = "< 1";
      }    
    if (Other_Percent < 1) {
        Other_Percent = "< 1";
      }
    Percentage_in_Poverty = (Percentage_in_Poverty* 100).toFixed(0);
    Number_of_Cases = Number_of_Cases.toLocaleString();
    County = County.toUpperCase().bold();
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>' + County + ' COUNTY </h4>'
            + '<p>' + NAMELSAD + '</p>'
            + '<p>' + Percentage_in_Poverty  + '% live in poverty </p>'
            + '<h2>' + Number_of_Cases + ' cases (' + percent + '%) </h2>'
            + '<p>' + 'population: ' + Population_Size + '</p>'
            + '<p>' + 'White: ' + Percent_White + '% </p>'
            + '<p>' + 'Black/African American: ' + Percent_Black + '% </p>'
            + '<p>' + 'Native American: ' + Percent_AIAN + '% </p>'
            + '<p>' + 'Hispanic/Latino: ' + Percent_Hispanic + '% </p>'
            + '<p>' + 'Asian: ' + Percent_Asian + '% </p>'
            + '<p>' + 'Other: ' + Other_Percent + '% </p>')

        .addTo(map);
});

// Change the cursor to a pointer when the mouse is over the countiesNY layer.
map.on('mouseenter', 'Poverty Level', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'Poverty Level', function () {
    map.getCanvas().style.cursor = '';
});




