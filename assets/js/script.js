
// ======================================================================================================
// === TESTING CODE =====================================================================================
// ======================================================================================================

// Fetch Information
var keyRec = "bf9a0395-5e31-4e13-a9d3-7192327f0be0";
// RIDB API
var urlTest1 = "https://ridb.recreation.gov/api/v1/facilities?offset=0&state=CO&latitude=-118.0186111&longitude=43.88037021&radius=9.75&activity=6,BOATING&lastupdated=10-01-2018&apikey=" + keyRec;
// OpenAQ
var urlTest2 = "https://docs.openaq.org/v2/locations?limit=100&page=1&offset=0&sort=desc&coordinates=38.3%2C-122.2&radius=1000&order_by=lastUpdated&dumpRaw=false";

function urlFecth (url) {
    fetch(url, {
        mode: "no-cors",
        headers: { 'Content-Type': 'text/plain' }
    })
    .then(function(response) {
        console.log(response);
        console.log(response.status);
    
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
    .catch( err => {
        console.log(err);
    });
};

urlFecth(urlTest1);
urlFecth(urlTest2);


// An API fetch that actually works
// fetch("https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=34.0522&lon=-118.2437&page=1&per_page=6&radius=50", {
//     "method": "GET",
//     "headers": {
//         "x-rapidapi-key": "6cbc683214mshdf5038bf7d4e267p15a6f0jsn91fc8c373911",
//         "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com"
//     }
// })
// .then(response => {
//     console.log(response);
//     return response.json();
// })
// .then(function (data){
//     console.log("data", data);
// })



// ======================================================================================================
// ==========================================   Actual  Code   ==========================================
// ======================================================================================================

// var currentTemp = 0;
// var currentHumi = 0;
// var currentUVI = 0;
// var currentWindSpe = 0;
// var currentWindGus = 0;
// var currentWindDeg = 0;


// var keyWeather = "22bb6e2db366aab8539ac22df7b32d3a";

// function getWeather (lat, lon, keyAPI) {

//     var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + keyAPI;

//     fetch(weatherURL)
//     .then(function(response) {
//         return response.json();                
//     })
//     .then(function(data) {
//         console.log(data);

//         currentTemp = data.current.temp;
//         currentHumi = data.current.humidity;
//         currentUVI = data.current.uvi;
//         currentWindSpe = data.current.wind_speed;
//         currentWindGus = data.current.wind_gust;
//         currentWindDeg = data.current.wind_deg;
//         console.log(currentTemp, currentHumi, currentUVI, currentWindSpe, currentWindGus, currentWindDeg);

//     })
//     .catch( err => {
//         console.log(err);
//     });

// };

// getWeather(90,43.88037021,keyWeather);