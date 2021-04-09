//Get parameters from search page
var queryLat =  findGetParameter("lat");
	var queryLong = findGetParameter("lon");
	var trailID = findGetParameter("id");
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}
console.log("****", findGetParameter("lon")) 


function getParameters() {
	//get search parameters out of URL
	var searchParamsArray = document.location.search.split("&");

	//Get the latitude and longitude values
	
	searchAPI (queryLat, queryLong);
}
var trailStats = $(".trail");
var weatherStats = $(".weather");
var currentTemp = 0;
var currentHumi = 0;
var currentUVI = 0;
var currentWindSpe = 0;
var currentWindGus = 0;
var currentWindDeg = 0;
var keyAPI = "22bb6e2db366aab8539ac22df7b32d3a";

//function to fetch weather
function searchAPI (queryLat, queryLong,) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + queryLat + "&lon=" + queryLong + "&units=imperial&appid=" + keyAPI;
    //fetches weather API
	fetch(weatherURL)
    .then(function(response) {
        return response.json();                
    })
    .then(function(data) {
        console.log(data);
        currentTemp = data.current.temp;
        currentHumi = data.current.humidity;
        currentUVI = data.current.uvi;
        currentWindSpe = data.current.wind_speed;
        currentWindGus = data.current.wind_gust;
        currentWindDeg = data.current.wind_deg;
		//forecast fetch
		var foreCastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + queryLat + "&lon=" + queryLong + "&units=imperial&appid=22bb6e2db366aab8539ac22df7b32d3a";
		console.log("forecast URL", foreCastUrl);
		
		fetch(foreCastUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function(forecastData) {
			console.log("forecastdata", forecastData)
		
		//filters the forecast data
		var foreCastData = forecastData.list.filter((listItem) => listItem.dt_txt.indexOf("00:00:00") > -1);
		console.log("forecastdata***", foreCastData);
		let cards = ""
		foreCastData.forEach(datum => {
			cards+=
			`
			<div class="column is-12">
			<div class="card column is-12">
			<h4 class='subtitle is-4'><strong>${new Date(datum.dt_txt).toLocaleDateString()}</strong></h4>
			<p class='subtitle is-6'>Temperature F: ${datum.main.temp_max}</p>
            <p class='subtitle is-6'>Humidity: ${datum.main.humidity}</p>
            <p class='subtitle is-6'>Wind Speed: ${datum.wind.speed} mph</p>
            <p><img src="http://openweathermap.org/img/w/${datum.weather[0].icon}.png"/></p>
			</div>
			</div>
			`;
		});
		//$(".forecast-container").html(cards);

		//fetches the trail API
		fetch("https://trailapi-trailapi.p.rapidapi.com/trails/" + trailID, {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": "6cbc683214mshdf5038bf7d4e267p15a6f0jsn91fc8c373911",
				"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com"
			}
		})
			.then(response => {
			return response.json();
		})
			.then(function(trailData) {
			console.log("trail Data", trailData);
				//display parameters of the trail
				trailName = trailData.data[0].name;
				trailImage = trailData.data[0].thumbnail;
				trailDescription = trailData.data[0].description;
				trailCity = trailData.data[0].city;
				trailDifficulty = trailData.data[0].difficulty;
				trailRating = trailData.data[0].rating;
				trailUrl = trailData.data[0].url;
				console.log(trailImage);



			//append weather info

			//appendWeatherInfo(currentTemp, currentHumi, currentUVI, currentWindSpe);
			//append trail info with arguments
			 appendTrailInfo(trailName, trailImage, trailDescription, trailCity, trailDifficulty, trailRating, trailUrl);
			 //appends cards
			 $(".forecast-container").html(cards);
		})
		})	
		})
	}
			//append elements to the HTML
	function appendWeatherInfo(currentTemp, currentHumi, currentUVI, currentWindSpe){ 
			$(weatherStats).append("<h2> Temperature F: " + currentTemp + "</h2>");
			$(weatherStats).append("<h5> Current Humidity: " + currentHumi + "</h5>");
			$(weatherStats).append("<h5> Current UVI: " + currentUVI + "</h5>");
			$(weatherStats).append("<h5> Current Wind Speed: " + currentWindSpe + " mph </h5>");
			
	}
	//do the work of appending trail info to page
	function appendTrailInfo(trailName, trailImage, trailDescription, trailCity, trailDifficulty, trailRating, trailUrl){
			$(trailStats).append("<h2 class='title is-2'>" + trailName + "</h2>");
			$(trailStats).append("<img src='" + trailImage + "'/>");
			$(trailStats).append("<p class='subtitle is-4'><strong>Trail Description:</strong> " + trailDescription + "</p>");
			$(trailStats).append("<p class='subtitle is-4'><strong> Trail City:</strong> " + trailCity + "</h5>");
			$(trailStats).append("<p class='subtitle is-4'><strong> Difficulty Level:</strong> " + trailDifficulty + "</p>");
			$(trailStats).append("<p class='subtitle is-4'><strong> Trail Rating:</strong> " + trailRating+ "</p>");
			$(trailStats).append("<p><a href='" +trailUrl+ "'><strong>For More Information Click Here</strong></a></p>")	
	}

getParameters();








// var city = "san francisco";
// var latitude;
// var longitude;
// var APIKey = "b7d72c9e1d3c51bb5697223f11eda7dd"
// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

// fetch (queryURL)
// .then(function (response) {
//     console.log("response", response);
//     return response.json();
// })
// .then(function (data){
//     console.log("data", data);
// 	latitude = data.city.coord.lat;
// 	longitude = data.city.coord.lon;
// 	console.log(latitude);
// 	console.log(longitude);




// fetch("https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat="+ latitude+ "&lon=" + longitude + "&page=1&per_page=6&radius=50", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "6cbc683214mshdf5038bf7d4e267p15a6f0jsn91fc8c373911",
// 		"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	console.log(response);
//     return response.json();
// })
// .then(function (data){
//     console.log("data", data);
// })
// })