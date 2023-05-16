$(function () {
  getCrimeCategories();
});

// search API for crime categories
function getCrimeCategories() {
  var url = "https://data.police.uk/api/crime-categories?date=2021-08";
  $.getJSON(url, function (categoriesJson) {
    addCrimeCategories(categoriesJson);
  });
}

// add crime categories to dropdown menu
function addCrimeCategories(categoriesJson) {
  for (var i = 0; i < categoriesJson.length; i++) {
    var crime = categoriesJson[i].name;
    var crimeUrl = categoriesJson[i].url;
    var test = "<h2>" + crime + "</h2>";
    var options = "<option value = '" + crimeUrl + "'>" + crime + "</option";

    $("#category").append(options);
  }
}
