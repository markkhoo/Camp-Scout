// Pointers



// Fetch Information
var keyRec = "bf9a0395-5e31-4e13-a9d3-7192327f0be0";
var urlTest1 = "https://ridb.recreation.gov/api/v1/facilities?offset=0&state=CO&latitude=-118.0186111&longitude=43.88037021&radius=9.75&activity=6,BOATING&lastupdated=10-01-2018&apikey=" + keyRec;
var urlTest2 = "https://docs.openaq.org/v2/locations?limit=100&page=1&offset=0&sort=desc&coordinates=38.3%2C-122.2&radius=1000&order_by=lastUpdated&dumpRaw=false";

// Fetch Function
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



//

