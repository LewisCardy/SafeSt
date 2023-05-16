$(document).ready(function(){
    //variable to store length of the table
    var numberOfCities = $("#citiesTable tr").length;


    //empty arrays
    var latArray = []
    var lngArray = []
    var rowIds = []


    //for each loop for the lng, lat and each row of the table
    //this is because it is much easier to work with and get the correct data in the table for the for loop below
    $(".latitude").each(function(){
        latArray.push($(this).html())
    });

    $(".longitude").each(function(){
        lngArray.push($(this).html())
    });

    $("#citiesTable tr").each(function(){
        rowIds.push(this.id);
    });


    //loops for the length of the table and gets the total number of crimes for the co ords given in the table
    for (let i = 0; i < numberOfCities; i++){
        var url = "https://data.police.uk/api/crimes-street/all-crime" + "?lat=" + latArray[i] + "&lng=" + lngArray[i]
        console.log(url)
        $.getJSON(url, function(getCrimeJson){
            var crimeCount = getCrimeJson.length;
            //if no crimes then no crimes found is put in the table otherwise the number of crimes commited in that area
            if (crimeCount){
                $("#"+rowIds[i]).find(".crimeNo").html(crimeCount);
            } else {
                $("#"+rowIds[i]).find(".crimeNo").html("No Crimes Found");
            }
        });
    }
});