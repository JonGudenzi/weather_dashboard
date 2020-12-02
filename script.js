let APIkey = "0883634af428fc459c0aeaef586593e5";
let inputEl = $('input[name="cityInput"]');

$(".submit").on("click", function () {
    let city = $(".inputValue").val();

    // debugger;
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city}&appid=${APIkey}`;

    $.ajax({
        url: queryURL,
        method: "GET",
        success: function () {
        }
    })
        .then(function (data) {
            createWeatherBlock(data);
            let lat = JSON.stringify(data.coord.lat);
            let lon = JSON.stringify(data.coord.lon);
            let queryURLSecond = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${lat}&lon=${lon}&appid=${APIkey}`;
            $.ajax({
                url: queryURLSecond,
                method: "GET"
            })
                .then(function (data2) {
                    forecastBlock(data2);

                    let obj = data2;
                    console.log(obj);
                });
        })
        
    var textHistory = JSON.parse(localStorage.getItem("text")) || [];
    textHistory.push(city);
    localStorage.setItem("text", JSON.stringify(textHistory));

})

function createWeatherBlock(data){
    let today = moment();
    $(".currentWeather").text(today.format("MMMM Do, YYYY"));
    $(".ul_city").append("<li>" + inputEl.val() );
    let weatherEl = $("<div>")
    let cityName = $("<h1>" + inputEl.val() + "</h1>") ;
    let tempEl = $("<p>Temp: " + data.main.temp + "</p>");
    let humidityEl = $("<p>Humidity: " + data.main.humidity + "</p>");
    let windEl = $("<p>Wind Speed: " + data.wind.speed + "</p>");
    
    weatherEl.append(cityName, tempEl, humidityEl, windEl);
    $(".currentWeather").append(weatherEl);
}

function forecastBlock(forcast){
    // current
let UVi = $("<p>UV Index: " + forcast.current.uvi + "</p>")
$(".currentWeather").append(UVi);

//day One
let tomorrow = moment().add(1, "days")
$(".day_One").text(tomorrow.format("MMMM Do, YYYY"));
let dayOne = $("<div>");
let tempForcastEl = $("<p>Temp: " + JSON.stringify(forcast.daily[0].temp.day) + "</p>");
let iconEl = $("<img src='http://openweathermap.org/img/wn/" + forcast.daily[0].weather[0].icon + ".png'>");
let humidityForcastEl = $("<p>Humidity: " + JSON.stringify(forcast.daily[0].humidity) + "%" + "</p>");
dayOne.append(tempForcastEl, iconEl, humidityForcastEl);
$(".day_One").append(dayOne);


// day two
let second_Day = moment().add(2, "days")
$(".day_Two").text(second_Day.format("MMMM Do, YYYY"));
let dayTwo = $("<div>");
let tempForcastEl2 = $("<p>Temp: " + JSON.stringify(forcast.daily[1].temp.day) + "</p>");
let iconEl2 = $("<img src='http://openweathermap.org/img/wn/" + forcast.daily[1].weather[0].icon + ".png'>");
let humidityForcastEl2 = $("<p>Humidity: " + JSON.stringify(forcast.daily[1].humidity) + "%" + "</p>");
dayTwo.append(tempForcastEl2, iconEl2, humidityForcastEl2);
$(".day_Two").append(dayTwo);

// day three
let Third_Day = moment().add(3, "days")
$(".day_Three").text(Third_Day.format("MMMM Do, YYYY"));
let dayThree = $("<div>");
let tempForcastEl3 = $("<p>Temp: " + JSON.stringify(forcast.daily[2].temp.day) + "</p>");
let iconEl3 = $("<img src='http://openweathermap.org/img/wn/" + forcast.daily[2].weather[0].icon + ".png'>");
let humidityForcastEl3 = $("<p>Humidity: " + JSON.stringify(forcast.daily[2].humidity) + "%" + "</p>");
dayThree.append(tempForcastEl3, iconEl3, humidityForcastEl3);
$(".day_Three").append(dayThree);

// day four
let Forth_Day = moment().add(4, "days")
$(".day_Four").text(Forth_Day.format("MMMM Do, YYYY"));
let dayFour = $("<div>");
let tempForcastEl4 = $("<p>Temp: " + JSON.stringify(forcast.daily[3].temp.day) + "</p>");
let iconEl4 = $("<img src='http://openweathermap.org/img/wn/" + forcast.daily[3].weather[0].icon + ".png'>");
let humidityForcastEl4 = $("<p>Humidity: " + JSON.stringify(forcast.daily[3].humidity) + "%" + "</p>");
dayFour.append(tempForcastEl4, iconEl4, humidityForcastEl4);
$(".day_Four").append(dayFour);

// day five
let Fifth_Day = moment().add(5, "days")
$(".day_Five").text(Fifth_Day.format("MMMM Do, YYYY"));
let dayFive = $("<div>");
let tempForcastEl5 = $("<p>Temp: " + JSON.stringify(forcast.daily[4].temp.day) + "</p>");
let iconEl5 = $("<img src='http://openweathermap.org/img/wn/" + forcast.daily[4].weather[0].icon + ".png'>");
let humidityForcastEl5 = $("<p>Humidity: " + JSON.stringify(forcast.daily[4].humidity) + "%" + "</p>");
dayFive.append(tempForcastEl5, iconEl5, humidityForcastEl5);
$(".day_Five").append(dayFive);
}


