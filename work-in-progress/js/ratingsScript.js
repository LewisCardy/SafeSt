//long list of variables for each cities coordinates
var londonLat = 51.509865;
var londonLng = -0.118092;

var manchesterLat = 53.483959;
var manchesterLng = -2.244644;
    
var birminghamLat = 52.489471;
var birminghamLng = -1.898575;

var leedsLat = 53.8008;
var leedsLng = -1.5491;

var southamptonLat = 50.9097;
var southamptonLng = -1.4044;

var liverpoolLat = 53.4084;
var liverpoolLng = -2.9916;

var newcastleLat = 54.9783;
var newcastleLng = -1.6178;

var sheffieldLat = 53.3811;
var sheffieldLng = -1.4701;

var belfastLat = 54.5973;
var belfastLng = -5.9301;

var brightonLat = 50.8225;
var brightonLng = -0.1372;


//when page is loaded update the table - defaults to all crime
$(document).ready(function(){
    var type = $("#category").val();
    getCities(type);
});

//when the update table is clicked update the table, used for when crime type is changed
$('#updateTable').click(function(){
    var type = $("#category").val();
    getCities(type);
});

//gets all of the info for each city including what will be added to the table
function getCities(type){

    londonData(type);
    manchesterData(type);
    birminghamData(type);
    leedsData(type);
    southamptonData(type);
    liverpoolData(type);
    newcastleData(type);
    sheffieldData(type);
    belfastData(type);
    brightonData(type);
    

}

//gets the JSON data for crimes within the city using the long and lat
function londonData(type){

    var url = "https://data.police.uk/api/crimes-street/" +type + "?lat=" + londonLat + "&lng=" + londonLng;
    $.getJSON(url, function(londonCrimesJson){
        addLondonToTable(londonCrimesJson);
    });
}

//adds the inforamation recieved in the JSON to add it to the relevent table row and adds each of the table data 
function addLondonToTable(londonCrimesJson){
    var crimeNo = londonCrimesJson.length;
    
    $("#london").find(".Latitude").html(londonLat);
    $("#london").find(".Longitude").html(londonLng);
    $("#london").find(".number").html(crimeNo);
    
}

//the same repeats for each city for the table
function manchesterData(type){

    var url = "https://data.police.uk/api/crimes-street/" +type + "?lat=" + manchesterLat + "&lng=" + manchesterLng;
    $.getJSON(url, function(manchesterCrimesJson){
        addManchesterToTable(manchesterCrimesJson);
    });
    
}

function addManchesterToTable(manchesterCrimesJson){
    var crimeNo = manchesterCrimesJson.length;
    
    $("#manchester").find(".Latitude").html(manchesterLat);
    $("#manchester").find(".Longitude").html(manchesterLng);
    $("#manchester").find(".number").html(crimeNo);
    
}

function birminghamData(type){
    
    var url = "https://data.police.uk/api/crimes-street/" +type + "?lat=" + birminghamLat + "&lng=" + birminghamLng;
    $.getJSON(url, function(birminghamCrimesJson){
        addBirminghamToTable(birminghamCrimesJson);
    });
    
}

function addBirminghamToTable(birminghamCrimesJson){
    var crimeNo = birminghamCrimesJson.length;
    
    $("#birmingham").find(".Latitude").html(birminghamLat);
    $("#birmingham").find(".Longitude").html(birminghamLng);
    $("#birmingham").find(".number").html(crimeNo);
    
}

function leedsData(type){

    var url = "https://data.police.uk/api/crimes-street/" +type + "?lat=" + leedsLat + "&lng=" + leedsLng;

    $.getJSON(url, function(leedsCrimesJson){
        addLeedsToTable(leedsCrimesJson);
    });
}

function addLeedsToTable(leedsCrimesJson){
    var crimeNo = leedsCrimesJson.length;
    
    $("#leeds").find(".Latitude").html(leedsLat);
    $("#leeds").find(".Longitude").html(leedsLng);
    $("#leeds").find(".number").html(crimeNo);
    
}

function southamptonData(type){

    var url = "https://data.police.uk/api/crimes-street/" +type + "?lat=" + southamptonLat + "&lng=" + southamptonLng;

    $.getJSON(url, function(southamptonCrimesJson){
        addSouthamptonToTable(southamptonCrimesJson);
    });
}

function addSouthamptonToTable(southamptonCrimesJson){
    var crimeNo = southamptonCrimesJson.length;
    
    $("#southampton").find(".Latitude").html(southamptonLat);
    $("#southampton").find(".Longitude").html(southamptonLng);
    $("#southampton").find(".number").html(crimeNo);
    
}

function liverpoolData(type){

    var url = "https://data.police.uk/api/crimes-street/" +type + "?lat=" + liverpoolLat + "&lng=" + liverpoolLng;

    $.getJSON(url, function(liverpoolCrimesJson){
        addLiverpoolToTable(liverpoolCrimesJson);
    });
}

function addLiverpoolToTable(liverpoolCrimesJson){
    var crimeNo = liverpoolCrimesJson.length;
    
    $("#liverpool").find(".Latitude").html(liverpoolLat);
    $("#liverpool").find(".Longitude").html(liverpoolLng);
    $("#liverpool").find(".number").html(crimeNo);
    
}

function newcastleData(type){

    var url = "https://data.police.uk/api/crimes-street/" +type + "?lat=" + newcastleLat + "&lng=" + newcastleLng;

    $.getJSON(url, function(newcastleCrimesJson){
        addNewcastleToTable(newcastleCrimesJson);
    });
}

function addNewcastleToTable(newcastleCrimesJson){
    var crimeNo = newcastleCrimesJson.length;
    
    $("#newcastle").find(".Latitude").html(newcastleLat);
    $("#newcastle").find(".Longitude").html(newcastleLng);
    $("#newcastle").find(".number").html(crimeNo);
    
}

function sheffieldData(type){

    var url = "https://data.police.uk/api/crimes-street/" +type + "?lat=" + sheffieldLat + "&lng=" + sheffieldLng;

    $.getJSON(url, function(sheffieldCrimesJson){
        addSheffieldToTable(sheffieldCrimesJson);
    });
}

function addSheffieldToTable(sheffieldCrimesJson){
    var crimeNo = sheffieldCrimesJson.length;
    
    $("#sheffield").find(".Latitude").html(sheffieldLat);
    $("#sheffield").find(".Longitude").html(sheffieldLng);
    $("#sheffield").find(".number").html(crimeNo);
    
}

function belfastData(type){

    var url = "https://data.police.uk/api/crimes-street/" +type + "?lat=" + belfastLat + "&lng=" + belfastLng;

    $.getJSON(url, function(belfastCrimesJson){
        addBelfastToTable(belfastCrimesJson);
    });
}

function addBelfastToTable(belfastCrimesJson){
    var crimeNo = belfastCrimesJson.length;
    
    $("#belfast").find(".Latitude").html(belfastLat);
    $("#belfast").find(".Longitude").html(belfastLng);
    $("#belfast").find(".number").html(crimeNo);
    
}

function brightonData(type){

    var url = "https://data.police.uk/api/crimes-street/" +type + "?lat=" + brightonLat + "&lng=" + brightonLng;

    $.getJSON(url, function(brightonCrimesJson){
        addBrightonToTable(brightonCrimesJson);
    });
}

function addBrightonToTable(brightonCrimesJson){
    var crimeNo = brightonCrimesJson.length;
    
    $("#brighton").find(".Latitude").html(brightonLat);
    $("#brighton").find(".Longitude").html(brightonLng);
    $("#brighton").find(".number").html(crimeNo);
    
}