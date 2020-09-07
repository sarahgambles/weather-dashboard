// global variables
// var userFormEl = document.querySelector("#user-form");
// var containerEl = document.querySelector("#search-city");

function getCities() {
    var search = document.querySelector("#city-search").value
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial")
    // add my own api key
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {
        console.log(response)

        var todayWeather = document.querySelector("#today-weather")
        todayWeather.textContent = " ";
        var cityEl = document.createElement("h1")
        cityEl.textContent = response.name
        
        todayWeather.append(cityEl)
        // response.name.temp
    })

}

// //function searchValue() {
//     var search = document.querySelector("#city-search").value
//     console.log(search);
//     getCities(search);
// }


document.querySelector("#btn").addEventListener("click", getCities);

// response.json().then(function(data){
    // console.log(data);
// })
// create a form to use inputs

// function to display date and time to accept both the array of city data and the term we searched for as parameters
    // be sure to clear old data
        // var example.textContent = "";

// varDisplayDateTime = function() {
//   dateTime.textContent = "searchCity";

// if conditional to check if the city doesn't exist, spelling errors, etc.
    // if (cities.length === 0) {
        // message
    // }
// }

// fetching and unpacking the json object
    // add conditional

// submit functions

// localStorage features

// add eventListener to capture the click

// append city every time you add an entry, this is what saves the data

// create issues for each step of the way

// console log EVERYTHING

// take it step by step creating the thing you want
