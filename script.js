$("#currContainer").hide();
$("#translateForm").hide();
$("#resContainer").hide();

// WEATHER
var forecastContainer = document.getElementById("forecastContainer");
var current = document.getElementById("currentWeather");
var forecast = document.getElementById("forecastWeather");

$("#searchCity").on("click", function(event) {
    event.preventDefault();
    
    var cityName = $("#cityName").val().trim();
    
    $("#translateForm").hide();
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
var language = "es";

$("#translateTab").on("click", function(event) {
    event.preventDefault();
    
    $("#currContainer").hide();
    $("#translateForm").show();
});

$("#translateText").on("click", function(event) {
    event.preventDefault();
    
    var translateInput = $("#translateInput").val().trim();
    
    $("#translateResult").empty();
    translateText(translateInput);
});

$(".language").on("click", function(event) {
    event.preventDefault();

    // console.log(this.text);
    if (this.text == "Spanish") {
        language = "es";
    }
    else if (this.text == "French") {
        language = "fr"
    }
    else if (this.text == "German") {
        language = "de"
    }
    else if (this.text == "Chinese") {
        language = "zh-CN"
    }
})

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
            "target": language
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log(response.data.translations[0].translatedText)

        $("<p>" + response.data.translations[0].translatedText + "</p>").appendTo(translateResult);
    });
}


//RESTUARANT API CODE

//Click function
 $("#restaurantTab").on("click", function(event) {
     event.preventDefault();
    
     $("#restaurantTab").show();
     $("#currContainer").hide();
     $("#translateForm").hide();
 });

//Typeahead settings
//variable is q

var nameSettings = { 
	"async": true,
	"crossDomain": true,
	"url": "https://worldwide-restaurants.p.rapidapi.com/typeahead",
	"method": "POST",
	"headers": {
		"x-rapidapi-host": "worldwide-restaurants.p.rapidapi.com",
		"x-rapidapi-key": "9b60481d00msh5759d44e6232b1ap1bd482jsn24bad57ab101",
		"content-type": "application/x-www-form-urlencoded"
	},
	"data": {
        "language": "en_US",
        //will be cityName
        "q": "Sacramento",
	}
}

$.ajax(nameSettings).done(function (response) {
    console.log(response);
    //location_id
    console.log("location id: " + response.results.data[0].result_object.location_id);
});
//end Typehead settings

//output from loaction_id will populate the search for restaurants
//THERE IS AN ISSUE WITH LOCATION ID
let locationID = response.results.data[0].result_object.location_id;
console.log(locationID);

var searchSettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://worldwide-restaurants.p.rapidapi.com/search",
	"method": "POST",
	"headers": {
		"x-rapidapi-host": "worldwide-restaurants.p.rapidapi.com",
		"x-rapidapi-key": "9b60481d00msh5759d44e6232b1ap1bd482jsn24bad57ab101",
		"content-type": "application/x-www-form-urlencoded"
	},
	"data": {
		"limit": "30",
        "language": "en_US",
		"location_id": locationID,
		"currency": "USD"
	}
}

//for loop goes here
for ( let i = 0; i < 5; i++) {
$.ajax(searchSettings).done(function (response) {
    console.log(response);
    console.log(response.results.data[i].name);
    console.log(response.results.data[i].address);
    console.log(response.results.data[i].rating);

});
//end searchSettings

//begin photoSettings
var photoSettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://worldwide-restaurants.p.rapidapi.com/photos",
	"method": "POST",
	"headers": {
		"x-rapidapi-host": "worldwide-restaurants.p.rapidapi.com",
		"x-rapidapi-key": "9b60481d00msh5759d44e6232b1ap1bd482jsn24bad57ab101",
		"content-type": "application/x-www-form-urlencoded"
	},
	"data": {
        "language": "en_US",
		"location_id": locationID,
		"currency": "USD",
		"limit": "15"
	}
}

$.ajax(photoSettings).done(function (response) {
	console.log(response.results.data[0].images.small.url);
	let image= $('<img>');
	image.attr("src", response.results.data[0].images.small.url);
	image.appendTo('#restaurants');



	
});
//end photoSettings

};
//end for loop
