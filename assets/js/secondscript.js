
fetch("https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=34.0522&lon=-118.2437&page=1&per_page=6&radius=50", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "6cbc683214mshdf5038bf7d4e267p15a6f0jsn91fc8c373911",
		"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
    return response.json();
})
.then(function (data){
    console.log("data", data);
})





var latitude = 34.0522;
var longitude= -118.2437;
var APIKey = "b7d72c9e1d3c51bb5697223f11eda7dd"
var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude+ "&appid=" + APIKey;

fetch (queryURL)
.then(function (response) {
    console.log("response", response);
    return response.json();
})
.then(function (data){
    console.log("data", data);
})


// var APIKey = "27ffe38d-a349-4d2d-ae63-4d825afba66c";
// var queryURL = 
// //"http://ridb.recreation.gov/api/v1/campsites?limit=6&offset=0&apikey=27ffe38d-a349-4d2d-ae63-4d825afba66c";

// fetch(queryURL, {
//     mode: 'no-cors',
//     credentials:'include'
// })
//     //convert the response into JSON 
//     .then(function (response) {
//       console.log("response", response)
//       return response;
//     })
   