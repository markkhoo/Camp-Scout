//fetch recreation API

// var APIKey = "27ffe38d-a349-4d2d-ae63-4d825afba66c";
// var queryURL = "http://ridb.recreation.gov/api/v1/campsites?limit=6&offset=0&apikey=27ffe38d-a349-4d2d-ae63-4d825afba66c";

// fetch(queryURL, {
//     mode: 'no-cors',
//     credentials:'include'
// })
//     //convert the response into JSON 
//     .then(function (response) {
//       console.log("response", response)
//       return response.json();
//     })
//     .then(function (data) {
//         console.log("data", data)
//     })

var APIKey = "b7d72c9e1d3c51bb5697223f11eda7dd"
var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude+ "&exclude={part}&appid=" + APIKey;
var latitude;
var longitude;
fetch (queryURL)
.then(function (response) {
    console.log("response", response)
})