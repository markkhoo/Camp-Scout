function getParameters() {
	//get search parameters out of URL
	var searchParamsArray = document.location.search.split("&");

	//Get the latitude and longitude values
	var queryLat = 34.0522 //searchParamsArray[0].split("=").pop();
	var queryLong = -118.2437 //searchParamsArray[1].split("=").pop();
	var trailID = 
	searchAPI (queryLat, queryLong);
}

var weatherStats = $(".weather")
var currentTemp = 0;
var currentHumi = 0;
var currentUVI = 0;
var currentWindSpe = 0;
var currentWindGus = 0;
var currentWindDeg = 0;
var keyAPI = "22bb6e2db366aab8539ac22df7b32d3a";
var lat = 34.0522;
var long = -118.2437;

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

		//fetches the trail API
		fetch("https://trailapi-trailapi.p.rapidapi.com/trails/283104", {
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
			//append weather info
			//append trail info with arguments
			appendWeatherInfo(currentTemp, currentHumi, currentUVI, currentWindSpe, currentWindGus); 
			appendTrailInfo();
		})	
		})
	}
			//append elements to the HTML
	function appendWeatherInfo(currentTemp, currentHumi, currentUVI, currentWindSpe, currentWindGus){ 
			$(weatherStats).append("<h5> Temperature F: " + currentTemp + "</h5>");
			$(weatherStats).append("<h5> Current Humidity: " + currentHumi + "</h5>");
			$(weatherStats).append("<h5> Current UVI: " + currentUVI + "</h5>");
			$(weatherStats).append("<h5> Current Wind Speed: " + currentWindSpe + " mph </h5>");
			
	}
	function appendTrailInfo(trailName, ){
		//do the work of appending to page the trail ino
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