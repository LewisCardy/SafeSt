$(function(){
    getLastUpdated();
    //sets the bounds for the map so that the user cannot pan away from the UK
var topCorner = L.latLng(59.642070,6.041957);
var bottomCorner = L.latLng(48.946857,-10.763403);
var mapBounds = L.latLngBounds(topCorner, bottomCorner);

//creates the map with the bounds
var mymap = L.map('mapid', {
    maxBounds: mapBounds
});


//set the initial view on the UK
mymap.setView([53, -4], 6.2);

//create the marker groups
var markerGroup = markerGroup = L.layerGroup().addTo(mymap);
var heatmapGroup = L.layerGroup().addTo(mymap);

//Grey map tileset
var Jawg_Dark = L.tileLayer('https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
	attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	minZoom: 6,
	subdomains: 'abcd',
	accessToken: 'o9ib76Lb2GhGPqal6IIUNEYhLKDpypyOiatxwn3Q4qbMURQHwx4AkYJyUPkAhkIw'
});

//Add the map style to the map
Jawg_Dark.addTo(mymap);

//gets the location coordinates from the browser so that the user can use current location
//it then sets the values of the longitude and latitude
$("#getLocation").click(function(){
    navigator.geolocation.getCurrentPosition(function(position){
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

    document.getElementById("latitude").value = lat;
    document.getElementById("longitude").value = lng;
    });
});


//when the search button is clicked
$("#search").click(function() {
    getCrimeData();
    
});

function getCrimeData(){
    //gets the values from the input boxes
    //the date is collected in parts then joined to get the desired format for the api
    
    var lng = $("#longitude").val();
    var lat = $("#latitude").val();

    //Testing Lat Lng - uncomment then comment ones above
    // var lng = -1.131592
    // var lat = 52.629729

    var fullDate = new Date($("#date").val());
    var month = fullDate.getMonth()+1;
    var year = fullDate.getFullYear();
    var date = [year, month].join('-');
    var type = $("#category").val();
    var url = "https://data.police.uk/api/crimes-street/" + type + "?lat=" + lat + "&lng=" + lng + "&date=" + date;
    

    $.getJSON(url, function(crimesJson){
        addCrimesToMap(crimesJson);
    }).fail(function(){
        alert("Error Searching Invalid Longitude, Latitude or Date. - This Website Only Searches In England, Northern Ireland, Or Wales")
    });


};

//gets the crime data from the api and then turns them into map markers with the data shown when clicked
function addCrimesToMap(crimesJson){
    if (crimesJson.length == 0){
        alert("No Crimes Found")
    } else {
            //remove existing layers
            mymap.removeLayer(markerGroup);
            mymap.removeLayer(heatmapGroup);
            var heatmapArray = []
            markerGroup = L.layerGroup().addTo(mymap);
            heatmapGroup = L.layerGroup().addTo(mymap);
            for (var i = 0; i < crimesJson.length; i++){
                var lat = crimesJson[i].location.latitude;
                var lng = crimesJson[i].location.longitude;
                var street = crimesJson[i].location.street.name;
                var type = crimesJson[i].category;
                var marker = L.marker([lat, lng]).addTo(markerGroup);
                marker.bindPopup("<br>" + "<b>"+street+"</b>" + "</br>" + 
                                 "<br> Lat: " + lat + " Lng: " + lng + "</br>"+
                                 "<br>" + type + "</br>").openPopup();
                mymap.setView([lat, lng], 13)
                //adding all of the points to the heatmap array
                heatmapArray.push([lat, lng, 0.2])
            }
            //creating the heatmap using the points in the array
            heatmap = L.heatLayer(heatmapArray, {
                radius: 25,
                minOpacity: 0.3,
                gradient: {0.2: 'blue', 0.3: 'blue', 0.4: 'red'}
            }).addTo(heatmapGroup);
            
    }
}


//gets the last time the api was updated
function getLastUpdated(){
    url = "https://data.police.uk/api/crime-last-updated";
    $.getJSON(url, function(lastUpdatedJson){
        var lastUpdate = lastUpdatedJson.date;
        $("#lastUpdate").text("API Last Updated: "+lastUpdate);
    });
};
});
