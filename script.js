var current = document.getElementById("currentWeather");
var forecast = document.getElementById("forecastWeather");
var forecastContainer = document.getElementById("forecastContainer");
$("#currContainer").hide();

$("#searchCity").on("click", function(event) {
    event.preventDefault();
    
    var cityName = $("#cityName").val().trim();
    
    $("#currContainer").show();
    $("#currentWeather").empty();
    currentWeather(cityName);
    forecastWeather(cityName);
});

function currentWeather(cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=cc1d7110e10d9b9390a02a70dc1628f5";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var srcLink = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
        
        $("<h2>" + response.name + " (current)" + "</h2>").appendTo(current);
        $("#currentWeather").append('<img id="weatherIcon" src="' + srcLink + '" />');
        $("<p>" + "Temperature: " + (response.main.temp * 9 / 5 - 459.67).toFixed(1) + " °F" + "</p>").appendTo(current);
        $("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>").appendTo(current);
        $("<p>" + "Wind Speed: " + response.wind.speed + " MPH" + "</p>").appendTo(current);
    });
}