let APIkey = "0883634af428fc459c0aeaef586593e5";

$(".submit").on("click", function(){
    let city = $(".inputValue").val();

    let queryURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city}&appid=${APIkey}`;
    
    
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    .then(function(response){
    createWeatherBlock(response);
    console.log(response);
    });

})

function createWeatherBlock(data){
    let weatherEl = $("<div>")
    let tempEl = $("<p>Temp: " + data.main.temp + "</p>");
    let humidityEl = $("<p>Humidity: " + data.main.humidity + "</p>");
    let windEl = $("<p>Wind Speed: " + data.wind.speed + "</p>");
    weatherEl.append(tempEl, humidityEl, windEl);
    $(".currentWeather").append(weatherEl);
}

