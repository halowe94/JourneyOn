$("#currContainer").hide();
$("#forecastContainer").hide();
$("#translateForm").hide();
$("#resContainer").hide();
$("#restuarants").hide();

// WEATHER
var current = document.getElementById("currentWeather");
var forecast = document.getElementById("forecastWeather");
var forecastContainer = document.getElementById("forecastContainer");

$("#searchCity").on("click", function(event) {
    event.preventDefault();
    
    var cityName = $("#cityName").val().trim();
    
    $("#translateForm").hide();
    $("#resContainer").hide();
    $("#currContainer").show();
    $("#forecastContainer").show();

    $("#currentWeather").empty();
    $("#forecastWeather").empty();
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

function forecastWeather(cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=cc1d7110e10d9b9390a02a70dc1628f5"
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var srcLink1 = "https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png"
        var srcLink2 = "https://openweathermap.org/img/wn/" + response.list[1].weather[0].icon + "@2x.png"
        var srcLink3 = "https://openweathermap.org/img/wn/" + response.list[2].weather[0].icon + "@2x.png"
        var srcLink4 = "https://openweathermap.org/img/wn/" + response.list[3].weather[0].icon + "@2x.png"
        var srcLink5 = "https://openweathermap.org/img/wn/" + response.list[4].weather[0].icon + "@2x.png"
        
        // console.log(response);

        $("<div class='forecastDivs' id='plusOne'>"+"</div>").appendTo(forecast);
        var plusOne = $("#plusOne")
        $("<h3>" + moment().add(1, 'days').format('l') + "</h3>").appendTo(plusOne);
        $("#plusOne").append('<img id="iconOne" src="' + srcLink1 + '" />')
        $("<p>" + "Temp: " + (response.list[0].main.temp * 9 / 5 - 459.67).toFixed(1) + " °F" + "</p>").appendTo(plusOne);
        $("<p>" + "Humidity: " + response.list[0].main.humidity + "%" + "</p>").appendTo(plusOne);

        $("<div class='forecastDivs' id='plusTwo'>"+"</div>").appendTo(forecast);
        var plusTwo = $("#plusTwo")
        $("<h3>" + moment().add(2, 'days').format('l') + "</h3>").appendTo(plusTwo);
        $("#plusTwo").append('<img id="iconTwo" src="' + srcLink2 + '" />')
        $("<p>" + "Temp: " + (response.list[1].main.temp * 9 / 5 - 459.67).toFixed(1) + " °F" + "</p>").appendTo(plusTwo);
        $("<p>" + "Humidity: " + response.list[1].main.humidity + "%" + "</p>").appendTo(plusTwo);

        $("<div class='forecastDivs' id='plusThree'>"+"</div>").appendTo(forecast);
        var plusThree = $("#plusThree")
        $("<h3>" + moment().add(3, 'days').format('l') + "</h3>").appendTo(plusThree);
        $("#plusThree").append('<img id="iconThree" src="' + srcLink3 + '" />')
        $("<p>" + "Temp: " + (response.list[2].main.temp * 9 / 5 - 459.67).toFixed(1) + " °F" + "</p>").appendTo(plusThree);
        $("<p>" + "Humidity: " + response.list[2].main.humidity + "%" + "</p>").appendTo(plusThree);

        $("<div class='forecastDivs' id='plusFour'>"+"</div>").appendTo(forecast);
        var plusFour = $("#plusFour")
        $("<h3>" + moment().add(4, 'days').format('l') + "</h3>").appendTo(plusFour);
        $("#plusFour").append('<img id="iconFour" src="' + srcLink4 + '" />')
        $("<p>" + "Temp: " + (response.list[3].main.temp * 9 / 5 - 459.67).toFixed(1) + " °F" + "</p>").appendTo(plusFour);
        $("<p>" + "Humidity: " + response.list[3].main.humidity + "%" + "</p>").appendTo(plusFour);

        $("<div class='forecastDivs' id='plusFive'>"+"</div>").appendTo(forecast);
        var plusFive = $("#plusFive")
        $("<h3>" + moment().add(5, 'days').format('l') + "</h3>").appendTo(plusFive);
        $("#plusFive").append('<img id="iconFive" src="' + srcLink5 + '" />')
        $("<p>" + "Temp: " + (response.list[4].main.temp * 9 / 5 - 459.67).toFixed(1) + " °F" + "</p>").appendTo(plusFive);
        $("<p>" + "Humidity: " + response.list[4].main.humidity + "%" + "</p>").appendTo(plusFive);
    });
}


// TRANSLATE
var translateContainer = document.getElementById("translateContainer");
var translateResult = document.getElementById("translateResult");
var language = "es";

$("#translateTab").on("click", function(event) {
    event.preventDefault();
    
    $("#currContainer").hide();
    $("#forecastContainer").hide();
    $("#resContainer").hide();
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
    else if (this.text == "Italian") {
        language = "it"
    }
    else if (this.text == "Chinese") {
        language = "zh-CN"
    }
    else if (this.text == "Korean") {
        language = "ko"
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
            "x-rapidapi-key": "2b07b6ec73mshd7f568f32fa4427p1efeb3jsnf11a6a1c6510",
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
    });
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log(response.data.translations[0].translatedText)

        $("<p>" + response.data.translations[0].translatedText + "</p>").appendTo(translateResult);
    });
}


//RESTUARANT API CODE

//restaurant Click function
$("#restaurantTab").on("click", function(event) {
    event.preventDefault();
   
    $("#resContainer").show();
    $("#restaurants").show();
    $("#currContainer").hide();
    $("#forecastContainer").hide();
    $("#translateForm").hide();
    
    //grab and parse object from local storage
var locationIdValue = JSON.parse(localStorage.getItem('location ID'));
let locationIdInput = parseInt(locationIdValue);
console.log("anotha one " + typeof parseInt(locationIdValue)) ;

//searchSettings
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
	   "location_id": locationIdInput,
	   "currency": "USD"
   }
}

    //for loop goes here
    for ( let i = 0; i < 5; i++) {
    $.ajax(searchSettings).done(function (response) {
        if (response.results.errors && response.results.errors.length > 0) {return}
        else{ 
        console.log("restaurant info" + response);
    console.log(response.results.data[i].name);
    console.log(response.results.data[i].address);
    console.log(response.results.data[i].rating);
        }
    
        let appendName = response.results.data[i].name;
        let appendAddress = response.results.data[i].address;
        let appendRating = response.results.data[i].rating;
        $('#resInfo').append("Restuarant Name: " + appendName + "Address: " + appendAddress + "Rating: " + appendRating);
    

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
        "location_id": locationIdInput,
        "currency": "USD",
        "limit": "15"
    }
    }

    $.ajax(photoSettings).done(function (response) {
    console.log(response.results.data[i].images.small.url);
    let image= $('<img>');
    image.attr("src", response.results.data[i].images.small.url);
    image.appendTo('#restaurants');



    
    });
    //end photoSettings

    };
    //end for loop
});
//end function

function myFunction() {
    var cityName = $("#cityName").val().trim();
    //set the city name in local storage
    localStorage.setItem('City Name', JSON.stringify(cityName));
    console.log("city name is " + cityName);


//variable for City Name in local storage
let cityInput = JSON.parse(localStorage.getItem('City Name'));
console.log(cityInput);
$('#nameOfCity').text(localStorage.getItem('City Name'));

//Location Global Variable
let locationID = "";

//Typeahead settings
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
	   "q": cityInput,
   }
}

$.ajax(nameSettings).done(function (response) {
   console.log(response);
   //location_id
   console.log("location id: " + response.results.data[0].result_object.location_id);
   locationID = response.results.data[0].result_object.location_id;
   console.log("test " + locationID);
   //set location in local storage
   localStorage.setItem("location ID", JSON.stringify(locationID));
});
//end Typehead settings
}
