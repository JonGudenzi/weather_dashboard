let APIkey = "0883634af428fc459c0aeaef586593e5";
let inputEl = $('input[name="cityInput"]');

$(".submit").on("click", function () {
    let city = $(".inputValue").val();
    $(".inputValue").val("");
    if (city == false){
        return;
    }
    else{
    //saving searches to local storage
    var textHistory = JSON.parse(localStorage.getItem("text")) || [];
    textHistory.push(city);
    localStorage.setItem("text", JSON.stringify(textHistory));
    dataRender(city);
    }
});

function dataRender(city) {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city}&appid=${APIkey}`;
    //calling first API to retreive lon/lat data to use in the second API
    $.ajax({
        url: queryURL,
        method: "GET",
        success: function () {
        }
    })
        .then(function (data) {
            createWeatherBlock(data, city);
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
    renderSaveSearchBtns();
}

$("body").on("click", ".cityBtn", function () {
    var save = $(this).text();
    dataRender(save);
});


function renderSaveSearchBtns() {
    $(".cityBtnContainer").empty();
    var currentData = JSON.parse(localStorage.getItem("text")) || [];
    currentData.forEach(function (searchData) {
        var btnData = $("<button>").addClass("cityBtn");
        console.log(btnData);
        btnData.text(searchData);
        $(".cityBtnContainer").append(btnData);
    });
}

renderSaveSearchBtns();

//current weather container
function createWeatherBlock(data, city) {
    let today = moment();
    $("#currentWeather").text(today.format("MMMM Do, YYYY"));
    $(".ul_city").append("<li>" + inputEl.val());
    let weatherEl = $("<div>")
    let cityName = $("<h1>" + city + "</h1>");
    let tempEl = $("<p>Temp: " + data.main.temp + "</p>");
    let humidityEl = $("<p>Humidity: " + data.main.humidity + "</p>");
    let windEl = $("<p>Wind Speed: " + data.wind.speed + "</p>");
    weatherEl.append(cityName, tempEl, humidityEl, windEl);
    $("#currentWeather").append(weatherEl);
    $("#forcastContainer").empty();
}

function forecastBlock(forcast) {
    // current
    let UVi = $("<p>UV Index: " + forcast.current.uvi + "</p>")
    $("#currentWeather").append(UVi);

    //day One
    let tomorrow = moment().add(1, "days")
    let dayOne = $('<div class="days">');
    dayOne.text(tomorrow.format("MMMM Do, YYYY"));
    let tempForcastEl = $("<p>Temp: " + JSON.stringify(forcast.daily[0].temp.day) + "</p>");
    let iconEl = $("<img src='http://openweathermap.org/img/wn/" + forcast.daily[0].weather[0].icon + ".png'>");
    let humidityForcastEl = $("<p>Humidity: " + JSON.stringify(forcast.daily[0].humidity) + "%" + "</p>");
    dayOne.append(tempForcastEl, iconEl, humidityForcastEl);
    $("#forcastContainer").append(dayOne);
    currentWeather.style.display = "inline-block";

    //next 4 days
    for (i = 1; i <= 4; i++) {
        let second_Day = moment().add(i + 1, "days")
        let day = $('<div class="days">');
        day.text(second_Day.format("MMMM Do, YYYY"));
        let tempForcastEl = $("<p>Temp: " + JSON.stringify(forcast.daily[i].temp.day) + "</p>");
        let iconEl = $("<img src='http://openweathermap.org/img/wn/" + forcast.daily[i].weather[0].icon + ".png'>");
        let humidityForcastEl = $("<p>Humidity: " + JSON.stringify(forcast.daily[i].humidity) + "%" + "</p>");
        day.append(tempForcastEl, iconEl, humidityForcastEl);
        $("#forcastContainer").append(day);
        
    }
}

