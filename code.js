var JOKECONTAINER = document.querySelector(".jokeContainer");
var API_METEO_URL = "https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&hourly=temperature_2m,precipitation_probability,windspeed_10m&current_weather=true&timezone=auto";
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
        METEOCONTAINER.innerHTML = "\n        Temperatura actual: ".concat(object.current_weather.temperature, " \u00BAC\n        <br>\n        Velocitat del vent: ").concat(object.current_weather.windspeed, " Km/h\n        ");
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
    score = 0;
});
VOTEBUTTONS.addEventListener("click", function (e) {
    var jokeVoted = e.target.id;
    var btn1 = document.getElementById("vote1");
    var btn2 = document.getElementById("vote2");
    var btn3 = document.getElementById("vote3");
    switch (jokeVoted) {
        case ("vote1"):
            btn1.classList.add(".voted");
            btn2.classList.remove(".voted");
            btn3.classList.remove(".voted");
            score = 1;
            break;
        case ("vote2"):
            score = 2;
            break;
        case ("vote3"):
            score = 3;
            break;
        default:
            score = 0;
    }
});
// FUNCTIONS
function printJoke() {
    JOKECONTAINER.innerHTML = (joke);
}
function showButtons() {
    VOTEBUTTONS.innerHTML =
        "\n    <p class=\"buttonsTitle\">Rate this joke:</p>\n    <button type=\"button\" id=\"vote1\" class=\"voteBtn\"></button> \n    <button type=\"button\" id=\"vote2\" class=\"voteBtn\"></button> \n    <button type=\"button\" id=\"vote3\" class=\"voteBtn\"></button> \n    ";
}
function addToArray() {
    var date = new Date().toISOString();
    var jokeObj = new JokeObject(joke, score, date);
    reportJokes.push(jokeObj);
    console.log(reportJokes);
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
