$(function(){

    $("#addNew").click(function(){
        addNewCity();
    })

    function addNewCity(){
        var name = $("#cityname").val();
        var lng = $("#longitude").val();
        var lat = $("#latitude").val();

        var cityString = "<tr id="+name+">" 
                            + "<td class=city>"+name+"</td>"
                            + "<td class=Longitude>"+lng+"</td>"
                            + "<td class = Latitude>"+lat+"</td>"
                            +"</tr>"
        $("#citiesTable").append(cityString)
    }
});