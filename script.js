let APIkey = "0883634af428fc459c0aeaef586593e5";
let inputEl = $('input[name="cityInput"]');


let today = moment();
$(".currentWeather").text(today.format("MMMM Do, YYYY"));


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
    $(".ul_city").append("<li>" + inputEl.val() );
    let weatherEl = $("<div>")
    let cityName = $("<h1>" + inputEl.val() + " " + "</h1>").add("id", "nowEl");
    let tempEl = $("<p>Temp: " + data.main.temp + "</p>");
    let humidityEl = $("<p>Humidity: " + data.main.humidity + "</p>");
    let windEl = $("<p>Wind Speed: " + data.wind.speed + "</p>");
    weatherEl.append(cityName, tempEl, humidityEl, windEl);
    $(".currentWeather").append(weatherEl);
}

