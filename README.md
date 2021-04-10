# Trail-Scout

## Summary
Trail Scout is an interactive application that allows users to search for trails by city name. What this means is that a user can search for trials by simply inputting the name of the city and the application returns a list of trails within a 100 mile radius. The application also returns weather information such as temperature, humidity, air quality, and weather icons for easy visualization.

The user is then able to browse through all of the results and pick a trail that looks interesting. When the user selects a trail and clicks on the trail card, the user is then redirected to a details page. In the details page, the user will find more information on the specific trail the user clicked. Information such as trail description, trail rating, trail difficulty, a photo of the trail, and a five day weather forecast of the trail. 

The user is then able to return to the search page and start a new search if they like to. Additionally, the application is able to save the search history. That means the user can easily compare the trails that have been clicked and make a more educated decision of which trail to check out.

## Site
![Site](./assets/images/trail-scout.gif)

## Motivation 
I’ve always run into problems going to a hiking spot. The weather is sometimes bad or the trail is closed. If only there was an app that puts together all of these considerations. No hiking or trail app will provide you with weather information on the day you plan to visit.

---

## Technologies Used
- HTML - Used to write the code for making the website
- CSS - Used to style the HTML code
- Javascript - Used to enhance the application and fetch API
- JQuery - Used to write javascript syntax
- GitHub - Used to store the repository in the cloud
- Git - Used to push edits up to the GitHub repository
- Open Weather API - Used to retrieve weather data
- Trail API - Used to fetch trail data
- Fetch - Used to send fetch to API
- Bulma - Is a free open source framework that provides developers with ready to use components. Bulma is easy to   use and quick to set up. Just copy the styling link into the HTML and add classes to elements.
- Sweet Alert - Used to replace vanilla modals
- ScreenToGif - Create Gifs for presentation and README

## Code Snippet
The first API we used was Trail API. It is a freemium API that allows 500 request per day max before charging a fee, it provides  info on trails for biking and hiking. The documentation for this API was fairly straightforward and easy to understand. Queries must be done by latitude and longitude or trail IDs. In this code snippet we can see how we had to concate the trail ID to the end of the fetch URL. 
 
```javascript
fetch("https://trailapi-trailapi.p.rapidapi.com/trails/" + trailID, {<br>
            "method": "GET",<br>
            "headers": {<br>
                "x-rapidapi-key": "6cbc683214mshdf5038bf7d4e267p15a6f0jsn91fc8c373911",<br>
                "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com"<br>
            }<br>
        })<br>
            .then(response => {<br>
            return response.json();<br>
        })<br>
            .then(function(trailData) {<br>
            console.log("trail Data", trailData);<br>
                //display parameters of the trail<br>
                trailName = trailData.data[0].name;<br>
                trailImage = trailData.data[0].thumbnail;<br>
```

---

## Repository Link
[Github Repo](https://github.com/markkhoo/Trail-Scout/tree/main)

## Deploy Link
[Trail Scout Website](https://markkhoo.github.io/Trail-Scout/)

---

## Personal Links

### Javier Modragon
[Github](https://github.com/javimarashall)
[LinkedIn](https://www.linkedin.com/in/javier-mondragon-7b471719b/)

### Mark Khoo
[Github](https://github.com/markkhoo)
[LinkedIn](https://www.linkedin.com/in/markdkhoo/)
