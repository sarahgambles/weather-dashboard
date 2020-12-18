// global variables
var userFormEl = document.querySelector("#user-form");
var containerEl = document.querySelector("#search-city");

// create today's date card
function getCities() {
    // fetch API to get the city search
    var search = document.querySelector("#city-search").value
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + 
    search + 
    "&appid=2efddecb7893bc632bfd32ea7419cf75&units=imperial")
    // return the response from the API key
    .then(function(response) {
        return response.json()
    })

    // return response with date, icon, temp, humidity, wind, and UV index
    .then(function(response) {
        console.log(response)

        // create card with today's date
        var todayWeather = document.querySelector("#today-weather")
        todayWeather.textContent = " ";
        var cityEl = document.createElement("h1")
        cityEl.classList.add("card-title")
        cityEl.textContent = `${response.name} ${new Date().toLocaleDateString()}`
        
        var card = document.createElement("div")
        card.classList.add("card")

        // Add wind
        var wind = document.createElement("p")
        wind.classList.add("card-text")

        // Add humidity
        var humidity = document.createElement("p")
        humidity.classList.add("card-text")

        // Add temp
        var temp = document.createElement("p")
        temp.classList.add("card-text")

        // Call responses
        humidity.textContent = `humidity: ${response.main.humidity}`
        wind.textContent = `wind: ${response.wind.speed}`
        temp.textContent = `temp: ${response.main.temp}`

        // Create card to hold the calls
        var cardBody = document.createElement("div")
        cardBody.classList.add("card-body")

        // Call image to render of icon
        var image = document.createElement("img")
        image.setAttribute("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

        // Append all items called
        cityEl.appendChild(image)
        cardBody.appendChild(cityEl)
        cardBody.appendChild(temp)
        cardBody.appendChild(humidity)
        cardBody.appendChild(wind)
        card.appendChild(cardBody)
        todayWeather.appendChild(card)

        // Call fiveDay() function
        fiveDay()

        // call uvIndex function
        uvIndex(response.coord.lat, response.coord.lon)
       
    })

}

// Create fiveDate() function 
function fiveDay() {
    // fetch 5 day forecast API
    var search = document.querySelector("#city-search").value
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + 
    search + 
    "&appid=2efddecb7893bc632bfd32ea7419cf75&units=imperial")

    // create response
    .then(function(response) {
        return response.json()
    })

    // create response to show the forecast
    .then(function(response) {
        console.log(response)

        // forecast text content
        var forecast = document.querySelector("#forecast")
        forecast.textContent = " ";

        // for loop to show index 
    for (i = 0; i < response.list.length; i++) {
        if (response.list[i].dt_txt.indexOf("12:00:00")!==-1) {

            // create card container elements
            var column = document.createElement("div")
            column.classList.add("col-md-2")

            var card = document.createElement("div")
            card.classList.add("card", "text-white", "bg-primary")

            var date = document.createElement("h4")
            date.classList.add("card-title")
            date.textContent = `${response.city.name} ${new Date().toLocaleDateString()}`

            var wind = document.createElement("p")
            wind.classList.add("card-text")

            var temp = document.createElement("p")
            temp.classList.add("card-text")

            var humidity = document.createElement("p")
            humidity.classList.add("card-text")

            var icon = document.createElement("img")
            icon.setAttribute("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png")

            // call humidity, temp, and wind responses
            humidity.textContent = `humidity: ${response.list[i].main.humidity}`
            temp.textContent = `temp: ${response.list[i].main.temp}`
            wind.textContent = `wind: ${response.list[i].wind.speed}`
      
            // cardBody content
            var cardBody = document.createElement("div")
            cardBody.classList.add("card-body")

            // append items
            column.appendChild(card)
            cardBody.appendChild(date)
            cardBody.appendChild(icon)
            cardBody.appendChild(temp)
            cardBody.appendChild(wind)
            cardBody.appendChild(humidity)
            card.appendChild(cardBody)
            forecast.appendChild(column)


        }
}
    })

    
}

// create uvIndex() function
function uvIndex(lat, lon) {
    // call uvIndex API key
    fetch("http://api.openweathermap.org/data/2.5/uvi?appid=2efddecb7893bc632bfd32ea7419cf75&lat=" + lat + "&lon=" + lon)
    .then(function(response) {
        return response.json();
    })
    // uvIndex card
    .then(data => {
        var body = document.querySelector(".card-body")
        var uv = document.createElement("p")
        uv.textContent = "uv index: " 
        var button = document.createElement("span")
        button.classList.add("btn", "btn-sm")
        button.innerHTML = data.value

        // safe uv button color
        if (data.value < 3) {
            button.classList.add("btn-success")
        }
        // warning uv button color
        else if (data.value < 7) {
            button.classList.add("btn-warning")
        }
        // dangerous uv button color
        else {
            button.classList.add("btn-danger")
        }

        // append buttons
        body.appendChild(uv)
        uv.appendChild(button)
    })
}

// call the functions to get the click
document.querySelector("#btn").addEventListener("click", getCities);

