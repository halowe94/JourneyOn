// WEATHER
var forecastContainer = document.getElementById("forecastContainer");
var current = document.getElementById("currentWeather");
var forecast = document.getElementById("forecastWeather");
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
        
        $("<h2>" + response.name + "</h2>").appendTo(current);
        $("#currentWeather").append('<img id="weatherIcon" src="' + srcLink + '" />');
        $("<p>" + "Temperature: " + (response.main.temp * 9 / 5 - 459.67).toFixed(1) + " °F" + "</p>").appendTo(current);
        $("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>").appendTo(current);
        $("<p>" + "Wind Speed: " + response.wind.speed + " MPH" + "</p>").appendTo(current);
    });
}


// TRANSLATE
var translateContainer = document.getElementById("translateContainer");
var translateResult = document.getElementById("translateResult");

$("#translateText").on("click", function(event) {
    event.preventDefault();
    
    var translateInput = $("#translateInput").val().trim();
    
    $("#translatedResult").empty();
    translateText(translateInput);
});

function translateText(translateInput) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://google-translate1.p.rapidapi.com/language/translate/v2",
        "method": "POST",
        "headers": {
            "x-rapidapi-host": "google-translate1.p.rapidapi.com",
            "x-rapidapi-key": "12d5ec1238msh592efbbc1c917e7p1b499ejsnc4830fc60542",
            "accept-encoding": "application/gzip",
            "content-type": "application/x-www-form-urlencoded"
        },
        "data": {
            "source": "en",
            "q": translateInput,
            "target": "es"
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log(response.data.translations[0].translatedText)

        $("<p>" + response.data.translations[0].translatedText + "</p>").appendTo(translateResult);
    });
}
