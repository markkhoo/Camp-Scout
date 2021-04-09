// Pointers
var searchForm = document.getElementById("location");
var searchHistory = document.getElementById("searchHistory");
var currentWeather = document.getElementById("currentWeather");
var searchResults = document.getElementById("searchResults");

// Global Variables
var currentCity = "";
var searchLat = 0;
var searchLon = 0;
var currentPageNum = 0;
var maximumPageNum = 0;

var tempFeel = 0;
var temp_min = 0;
var temp_max = 0;
var humidity = 0;
var wind_deg = 0;
var wind_spe = 0;
var weatherIcon = "";

var aqi = 0;
var pm2_5 = 0;
var pm10 = 0;

// Update Page Number
function updatePageNum() {
    document.getElementById("pageNum").innerHTML = " " + currentPageNum + " of " + maximumPageNum;
};

// Wind Direction Solver
function windDirection(deg) {
    if (deg < 23 || deg >= 338) {
        return "N"
    } else if (deg < 68) {
        return "NE"
    } else if (deg < 113) {
        return "E"
    } else if (deg < 153) {
        return "SE"
    } else if (deg < 203) {
        return "S"
    } else if (deg < 248) {
        return "SW"
    } else if (deg < 293) {
        return "W"
    } else if (deg < 338) {
        return "NW"
    } else {
        return ""
    };
};

// Card Image Function
function imageWeather (icon) {
    if (icon == "01d" || icon == "01n") {
        return 'url("./assets/images/clear_sky.jpeg")';
    } else if (icon == "02d" || icon == "02n") {
        return 'url("./assets/images/few_clouds.jpeg")';
    } else if (icon == "03d" || icon == "03n") {
        return 'url("./assets/images/scattered_clouds.jpeg")';
    } else if (icon == "04d" || icon == "04n") {
        return 'url("./assets/images/broken_clouds.jpeg")';
    } else if (icon == "09d" || icon == "09n") {
        return 'url("./assets/images/light_rain.jpeg")';
    } else if (icon == "10d" || icon == "10n") {
        return 'url("./assets/images/rain.jpeg")';
    } else if (icon == "11d" || icon == "11n") {
        return 'url("./assets/images/thunderstorm.jpeg")';
    } else if (icon == "13d" || icon == "13n") {
        return 'url("./assets/images/snow.jpeg")';
    } else if (icon == "50d" || icon == "50n") {
        return 'url("./assets/images/mist.jpeg")';
    } else {
        return 'url("./assets/images/white.jpeg")';
    };
};

// Function for onclick... Goes to second page
function clickToPage() {
    var queryLat =  this.getAttribute("data-lat");
    var queryLon =  this.getAttribute("data-lon");
    var queryID =   this.getAttribute("data-id");
    var queryName = this.getAttribute("data-name");
    var queryUrl = "./assets/js/facility.html?lat=" + queryLat + "&lon=" + queryLon + "&id=" + queryID;
    // This Loads the other page
    location.assign(queryUrl);
    
    storeSearches(queryName, queryLat, queryLon, queryID);
    // console.log(`lat: ${queryLat} \nlon: ${queryLon} \nid: ${queryID} \nname: ${queryName}`);
};

// Store Previous Searches
function storeSearches(name, lat, lon, trailID) {
    // Store INFO into object
    var currentTrail = {
        name: name,
        lat: lat,
        lon: lon,
        trailID: trailID
    };

    // Pull stored trail info from local storage
    var storedTrails = JSON.parse(localStorage.getItem("storedTrails"));

    // Check if stored Trails exist
    if (storedTrails != null) {
        
        // Create array of name for duplicate check below
        var nameCheck = [];
        for (var i = 0; i < storedTrails.length; i++ ) {
            nameCheck.push(storedTrails[i].name);
        };

        // Check for duplicate Trails
        if (!nameCheck.includes(name)) {

            // Push into stored Trails and store
            storedTrails.push(currentTrail);
            localStorage.setItem("storedTrails", JSON.stringify(storedTrails));
        };

    } else {

        // Push new object into an empty array and store
        var stringOTrails = [];
        stringOTrails.push(currentTrail);
        localStorage.setItem("storedTrails", JSON.stringify(stringOTrails)); 
    };

};

// Display Previous Searches
function displaySearches() {

    // Pull stored trail info from local storage
    var storedTrails = JSON.parse(localStorage.getItem("storedTrails"));

    // Check is stored Trails exist
    if (storedTrails != null) {      
        for (var i = 0; i < storedTrails.length; i++ ) {

            // Set attributes in button
            var recentSearch = document.createElement("span");
            recentSearch.innerHTML = storedTrails[i].name;
            recentSearch.setAttribute("data-name", storedTrails[i].name);
            recentSearch.setAttribute("data-lat", storedTrails[i].lat);
            recentSearch.setAttribute("data-lon", storedTrails[i].lon);
            recentSearch.setAttribute("data-id", storedTrails[i].trailID);
            recentSearch.setAttribute("class","tag is-link is-light is-rounded");
            recentSearch.onclick = clickToPage;

            searchHistory.appendChild(recentSearch);
        };

        // Create Clear Recent Searches Button
        var clearButton = document.createElement("span");
        clearButton.innerHTML = "Clear Recent Searches";
        clearButton.setAttribute("class","tag is-danger is-light is-rounded");
        clearButton.onclick = function () {
            localStorage.removeItem("storedTrails");
            searchHistory.innerHTML = "";
        };

        searchHistory.appendChild(clearButton);
    };

};

// Display City Weather
function displayWeather(data_object) {
    currentWeather.innerHTML = "";

    tempFeel = data_object.main.feels_like;
    temp_min = data_object.main.temp_min;
    temp_max = data_object.main.temp_max;
    humidity = data_object.main.humidity;
    wind_deg = data_object.wind.deg;
    wind_spe = data_object.wind.speed;
    weatherIcon = data_object.weather[0].icon;

    var card_tempFeel = document.createElement("h3");
    var card_temp_min = document.createElement("h3");
    var card_temp_max = document.createElement("h3");
    var card_humidity = document.createElement("h3");
    var card_wind_all = document.createElement("h3");
    var card_break001 = document.createElement("br");
    var card_break002 = document.createElement("br");

    card_tempFeel.innerHTML = "Feels like " + Math.round(tempFeel) + " °F";
    card_temp_min.innerHTML = "min " + Math.floor(temp_min) + " °F";
    card_temp_max.innerHTML = "max " + Math.ceil(temp_max) + " °F";
    card_humidity.innerHTML = "Humidity: " + Math.round(humidity) + "%";
    card_wind_all.innerHTML = "Wind: " + windDirection(wind_deg) + " " + Math.round(wind_spe) + " mph";

    currentWeather.appendChild(card_tempFeel);
    currentWeather.appendChild(card_temp_min);
    currentWeather.appendChild(card_temp_max);
    currentWeather.appendChild(card_break001);
    currentWeather.appendChild(card_humidity);
    currentWeather.appendChild(card_wind_all);
    currentWeather.appendChild(card_break002);

    currentWeather.style.setProperty("background-image", imageWeather(weatherIcon));
};

// Display City AQI
function displayAQI(data_object) {
    aqi = data_object.list[0].main.aqi;
    pm2_5 = data_object.list[0].components.pm2_5;
    pm10 = data_object.list[0].components.pm10;

    var card_aqi =   document.createElement("h3");
    var card_pm2_5 = document.createElement("h3");
    var card_pm10 =  document.createElement("h3");

    card_aqi.innerHTML =   "AQI " + aqi;
    card_pm2_5.innerHTML = "PM2.5: " + pm2_5 + " μg/m3";
    card_pm10.innerHTML =  "PM10: " + pm10 + " μg/m3";

    if (aqi == 1) {
        card_aqi.style.setProperty("background-color", "rgb(20,221,240)");
    } else if (aqi == 2) {
        card_aqi.style.setProperty("background-color", "rgb(45,247,51)");
    } else if (aqi == 3) {
        card_aqi.style.setProperty("background-color", "rgb(224,210,51)");
    } else if (aqi == 4) {
        card_aqi.style.setProperty("background-color", "rgb(247,148,45)");
    } else if (aqi == 5) {
        card_aqi.style.setProperty("background-color", "rgb(240,41,70)");
    };

    currentWeather.appendChild(card_aqi);
    currentWeather.appendChild(card_pm2_5);
    currentWeather.appendChild(card_pm10);
};

// Display Cards
function displayResults(data_object) {

    // Clear Previous Results if any
    searchResults.innerHTML = "";

    // Update Current City in search results
    document.getElementById("currentCity").innerHTML = currentCity;

    // Display Subtitles on Search
    document.getElementById("subtitle2").style.setProperty("visibility", "initial");
    document.getElementById("subtitle3").style.setProperty("visibility", "initial");
    document.getElementById("currentWeather").style.setProperty("visibility", "initial");

    // Check for non-zero results
    if (data_object.data != null) {

        // Display Main Work
        for (var i = 0; i < data_object.data.length; i++) {

            // Append Individual Card Results
            var cardResult = document.createElement("div");
            cardResult.setAttribute("class", "card column is-one-third block");
            cardResult.setAttribute("data-lat", data_object.data[i].lat);
            cardResult.setAttribute("data-lon", data_object.data[i].lon);
            cardResult.setAttribute("data-id",  data_object.data[i].id.toString());
            cardResult.setAttribute("data-name", data_object.data[i].name);
            cardResult.onclick = clickToPage;

            var resultName = document.createElement("h4");
            resultName.setAttribute("class","card-header-title");
            resultName.innerHTML = data_object.data[i].name;

            var resultDiff = document.createElement("p");
            resultDiff.setAttribute("class","card-content");
            // Checks if trail has a difficulty
            if (data_object.data[i].difficulty != "") {
                resultDiff.innerHTML = "Trail Difficulty: " + data_object.data[i].difficulty;
            } else {
                resultDiff.innerHTML = "Trail Difficulty: n/a";
            };
            
            var resultRate = document.createElement("p");
            resultRate.setAttribute("class","card-content");
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

// Weather Search Function
function weatherSearch(cityName) {

    // Construct URL to be fetched
    var keyWeather = "22bb6e2db366aab8539ac22df7b32d3a"
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + keyWeather;

    fetch(weatherURL)
    .then(function(response) {

        // Checks for valid City
        if (response.status == 200) {
            return response.json();
        } else {

            // SWEET ALERT modal
            swal("Invalid City Name", "Please input another city name", "error");

            return null;
        };
    })
    .then(function(data) {
        console.log(data);

        currentCity = cityName.toUpperCase();
        searchLat = data.coord.lat;
        searchLon = data.coord.lon;
        currentPageNum = 1;

        // Run Trail Search Function and Update Page Number
        trailSearch(currentPageNum,searchLat,searchLon);

        // Display Weather Information
        displayWeather(data);
        
        // Run Air Pollution Search (MUST run AFTER disaplayWeather)
        airPollutionSearch(searchLat,searchLon,keyWeather);
    })
    .catch(err => {
        console.log(err);
    });
};

// Air Pollution Search Function
function airPollutionSearch (lat, lon, keyAPI) {
    fetch("https://api.openweathermap.org/data/2.5/air_pollution?lat=" + lat + "&lon=" + lon + "&appid=" + keyAPI)
    .then(response => {
        return response.json();
    })
    .then(function(data) {
        displayAQI(data);
        console.log(data);
    });
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
    .then(function(data) {
        maximumPageNum = Math.ceil(data.results / results_Number);
        updatePageNum();
        console.log(data);

        displayResults(data);
    });
};

// INITIALIZE
function init() {
    displaySearches();

    document.getElementById("subtitle2").style.setProperty("visibility", "hidden");
    document.getElementById("subtitle3").style.setProperty("visibility", "hidden");
    document.getElementById("currentWeather").style.setProperty("visibility", "hidden");
};
init();

// Form Submission
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var cityQuery = searchForm.firstElementChild.value.toLowerCase();

    weatherSearch(cityQuery);
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
