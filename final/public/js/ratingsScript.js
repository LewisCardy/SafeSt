
//when the page loads it uses the categorie already in place
$(function(){
    var type = $("#category").val();
    getCities(type)
});

//when the update table button is clicked it searches again with the new category
$('#updateTable').click(function(){
    var type = $("#category").val();
    getCities(type);
});

//updating the table and getting data from api
function getCities(type){
    var type = $("#category").val();
    //a list of key pair values for the needed data for the coordinates and upda4ting the table
    var cities = {0: ["#london", 51.509865, -0.118092],
            1: ["#manchester", 53.483959, -2.244644],
            2: ["#birmingham", 52.489471, -1.898575],
            3: ["#leeds", 53.8008, -1.5491],
            4: ["#southampton", 50.9097, -1.4044],
            5: ["#liverpool", 53.4084, -2.9916],
            6: ["#newcastle", 54.9783, -1.6178],
            7: ["#sheffield", 53.3811, -1.4701],
            8: ["#belfast", 54.5973, -5.9301],
            9: ["#brighton", 50.8225, -0.1372]};

    console.log(cities[1][2])
    //loop runs 10 times so each city is updated within the table
    for (let i = 0; i <= 10; i++){
        //gets the number of crimes for each city then adds this data to the table
        var url = "https://data.police.uk/api/crimes-street/" + type + "?lat=" + cities[i][1] + "&lng=" + cities[i][2];
        $.getJSON(url, function(getCrimeJson){
            var crimeCount = getCrimeJson.length;
            $(cities[i][0]).find(".Latitude").html(cities[i][1]);
            $(cities[i][0]).find(".Longitude").html(cities[i][2]);
            $(cities[i][0]).find(".number").html(crimeCount);
        });
    }
}