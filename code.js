var JOKECONTAINER = document.querySelector(".jokeContainer");
var API_METEO_URL = "https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&current_weather=true&timezone=auto&forecast_days=1";
var BUTTON = document.querySelector(".btn");
var VOTEBUTTONS = document.querySelector(".buttonContainer");
var METEOCONTAINER = document.querySelector(".meteoContainer");
var api_url;
var api_prop;
var score = 0;
var reportJokes = [];
var joke;
var counter = 0;
// DOM Events
window.onload = function () {
    fetch(API_METEO_URL, { headers: { 'Accept': 'application/json' } })
        .then(function (response) { return response.json(); })
        .then(function (object) {
        var weatherCode = object.current_weather.weathercode;
        var weatherIconUrl = "";
        console.log("El weather Code es:" + weatherCode);
        switch (weatherCode) {
            case (0):
                weatherIconUrl = "./img/weather/sunny.png";
                break;
            case 1:
            case 2:
            case 3:
                weatherIconUrl = "./img/weather/clouds_sun.png";
                break;
            case 45:
            case 48:
                weatherIconUrl = "./img/weather/foggy.png";
                break;
            case 51:
            case 52:
            case 53:
            case 56:
            case 57:
                weatherIconUrl = "./img/weather/cloudy_rain_sunny.png";
                break;
            case 61:
            case 63:
            case 65:
            case 66:
            case 67:
                weatherIconUrl = "./img/weather/rain.png";
                break;
            case 71:
            case 73:
            case 75:
            case 77:
                weatherIconUrl = "./img/weather/snow.png";
                break;
            case 80:
            case 81:
            case 82:
            case 85:
            case 86:
            case 95:
            case 96:
            case 99:
                weatherIconUrl = "./img/weather/storm.png";
                break;
        }
        METEOCONTAINER.innerHTML =
            "<div class=\"weatherContainer\">\n        <img src=\"".concat(weatherIconUrl, "\"> | ").concat(object.current_weather.temperature, " \u00BAC\n        </div>\n        ");
    })
        .catch(function (error) { return console.log(error); });
};
BUTTON.addEventListener("click", function (e) {
    if (counter % 2 !== 0) {
        api_url = "https://icanhazdadjoke.com/";
        api_prop = "joke";
        counter++;
    }
    else {
        api_url = "https://api.chucknorris.io/jokes/random";
        api_prop = "value";
        counter++;
    }
    fetch(api_url, { headers: { "Accept": "application/json" } })
        .then(function (response) { return response.json(); })
        .then(function (object) { return joke = (object["".concat(api_prop)]); })
        .then(printJoke)
        .then(showButtons)
        .catch(function (error) { return console.log(error); });
    if (score !== 0) {
        addToArray();
    }
    changeBackground();
    score = 0;
});
VOTEBUTTONS.addEventListener("click", function (e) {
    var jokeVoted = e.target.id;
    var btn1 = document.getElementById("vote1");
    var btn2 = document.getElementById("vote2");
    var btn3 = document.getElementById("vote3");
    var buttons = document.querySelectorAll(".voteBtn");
    buttons.forEach(function (button) { return button.classList.remove("voted"); });
    if (jokeVoted === "vote1") {
        addVotedClass(e);
        score = 1;
    }
    else if (jokeVoted === "vote2") {
        addVotedClass(e);
        score = 2;
    }
    else if (jokeVoted === "vote3") {
        addVotedClass(e);
        score = 3;
    }
});
// FUNCTIONS
function printJoke() {
    JOKECONTAINER.innerHTML = (joke);
}
function showButtons() {
    VOTEBUTTONS.innerHTML =
        "\n    <button type=\"button\" id=\"vote1\" class=\"voteBtn\"></button> \n    <button type=\"button\" id=\"vote2\" class=\"voteBtn\"></button> \n    <button type=\"button\" id=\"vote3\" class=\"voteBtn\"></button> \n    ";
}
function addToArray() {
    var date = new Date().toISOString();
    var jokeObj = new JokeObject(joke, score, date);
    reportJokes.push(jokeObj);
    console.log(reportJokes);
}
function changeBackground() {
    var random = Math.floor(Math.random() * 10);
    var body = document.getElementById("body");
    body.className = ("body".concat(random));
}
function addVotedClass(e) {
    e.target.classList.add("voted");
}
// CLASS
var JokeObject = /** @class */ (function () {
    function JokeObject(joke, score, date) {
        this.joke = joke;
        this.score = score;
        this.date = date;
    }
    return JokeObject;
}());
