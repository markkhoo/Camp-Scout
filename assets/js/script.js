// ======================================================================================================
// ==========================================   Actual  Code   ==========================================
// ======================================================================================================

// Pointers
var searchForm = document.getElementById("location");
var searchResults = document.getElementById("searchResults");

// Global Variables
var searchLat = 0;
var searchLon = 0;
var currentCity = "";
var currentPageNum = 0;
var maximumPageNum = 0;

// Display Cards
function displayResults(data_object) {

    // Clear Previous Results if any
    searchResults.innerHTML = "";

    // Update Current City in search results
    document.getElementById("currentCity").innerHTML = currentCity;

    // Check for non-zero results
    if (data_object.data != null) {

        // Display Main Work
        for (var i = 0; i < data_object.data.length; i++) {

            // Append Individual Card Results
            var cardResult = document.createElement("div");
            cardResult.setAttribute("class", "Card");
            cardResult.setAttribute("data-lat", data_object.data[i].lat);
            cardResult.setAttribute("data-lon", data_object.data[i].lon);
            cardResult.setAttribute("data-id",data_object.data[i].id.toString());

            var resultName = document.createElement("h4");
            resultName.innerHTML = data_object.data[i].name;

            var resultDiff = document.createElement("p");
            // Checks if trail has a difficulty
            if (data_object.data[i].difficulty != "") {
                resultDiff.innerHTML = "Trail Difficulty: " + data_object.data[i].difficulty;
            } else {
                resultDiff.innerHTML = "Trail Difficulty: n/a";
            };
            
            var resultRate = document.createElement("p");
            // Checks if trail has a rating
            if (data_object.data[i].rating != "") {
                resultRate.innerHTML = "Trail Rating: " + data_object.data[i].rating + "/5";
            } else {
                resultRate.innerHTML = "Trail Rating: n/a ";
            };

            cardResult.appendChild(resultName);
            cardResult.appendChild(resultDiff);
            cardResult.appendChild(resultRate);
            searchResults.appendChild(cardResult);
        };  
        
    } else {
        var noResults = document.createElement("p");

        // No search results... Display "No trails nearby"
        noResults.innerHTML = "no results";
        searchResults.appendChild(noResults);
    };
};

// Trail Search Function
function trailSearch(pageNum, lat, lon) {
    var results_Number = 12;
    fetch("https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat="+ lat + "&lon=" + lon + "&page=" + pageNum + "&per_page=" + results_Number + "&radius=100", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "6cbc683214mshdf5038bf7d4e267p15a6f0jsn91fc8c373911",
            "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com"
        }
    })
    .then(response => {
        return response.json();
    })
    .then(function (data){
        maximumPageNum = Math.ceil(data.results / results_Number);
        console.log(data);

        displayResults(data);
    });
};

// Update Page Number
function updatePageNum() {
    document.getElementById("pageNum").innerHTML = currentPageNum;
};

// Form Submission
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Construct URL to be fetched
    var cityName = searchForm.firstElementChild.value.toLowerCase();
    var keyWeather = "22bb6e2db366aab8539ac22df7b32d3a"
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + keyWeather;

    fetch(weatherURL)
    .then(function(response) {

        // Checks for valid City
        if (response.status == 200) {
            return response.json();
        } else {
            return null;
        };
    })
    .then(function(data) {
        console.log(data);

        currentCity = cityName.toUpperCase();
        searchLat = data.coord.lat;
        searchLon = data.coord.lon;
        currentPageNum = 1;

        trailSearch(currentPageNum,searchLat,searchLon);
        updatePageNum();
    })
    .catch(err => {
        console.log(err);
    });

});

// Next Button
document.getElementById('nextBtn').addEventListener('click', function(){
    if (currentPageNum < maximumPageNum) {
        currentPageNum++;
        trailSearch(currentPageNum,searchLat,searchLon);
        updatePageNum();
    };
});

// Previous Button
document.getElementById('prevBtn').addEventListener('click', function(){
    if (currentPageNum > 1) {
        currentPageNum--;
        trailSearch(currentPageNum,searchLat,searchLon);
        updatePageNum();
    };  
});

// Card Listener
searchResults.addEventListener('click', function(event) {

    currentElement = event.target;
    console.log(currentElement);
    
    // console.log(location);
    // var queryTest = "./assets/facility.html"
    // console.log(location.assign(queryTest));
});


















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