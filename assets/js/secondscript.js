// function getParameters() {
// 	//get search parameters out of URL
// 	var searchParamsArray = document.location.search.split("&");

// 	//Get the latitude and longitude values
// 	var queryLatitude = searchParamsArray[0].split("=").pop();
// 	var queryLongitude = searchParamsArray[1].split("=").pop();
	
// 	searchAPI (queryLatitude, queryLongitude);
// }


var currentTemp = 0;
var currentHumi = 0;
var currentUVI = 0;
var currentWindSpe = 0;
var currentWindGus = 0;
var currentWindDeg = 0;
var keyWeather = "22bb6e2db366aab8539ac22df7b32d3a";


function getWeather (lat, lon, keyAPI) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + keyAPI;
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
        console.log(currentTemp, currentHumi, currentUVI, currentWindSpe, currentWindGus, currentWindDeg);

		//fetches the trail API
		fetch("https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=34.0522&lon=-118.2437&page=1&per_page=6&radius=50", {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": "6cbc683214mshdf5038bf7d4e267p15a6f0jsn91fc8c373911",
				"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com"
			}
		})
		.then(response => {
			// console.log(response);
			return response.json();
		})
		.then(function (data){
			console.log("data", data);
			
		})

    })
    .catch( err => {
        console.log(err);
    });
};

// getParameters();








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