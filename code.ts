const JOKECONTAINER = <HTMLInputElement>document.querySelector(".jokeContainer");
const API_METEO_URL: string = "https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&current_weather=true&timezone=auto&forecast_days=1";
const BUTTON = <HTMLInputElement>document.querySelector(".btn");
const VOTEBUTTONS = <HTMLInputElement>document.querySelector(".buttonContainer");
const METEOCONTAINER = <HTMLInputElement>document.querySelector(".meteoContainer");
let api_url: string;
let api_prop: string;
let score: number = 0;
let reportJokes: {date:string, joke: string, score: number}[] = [];
let joke: string;
let counter: number = 0;



// DOM Events

window.onload = () => {
    fetch(API_METEO_URL, {headers: {'Accept': 'application/json'}})
    .then((response) => response.json())
    .then((object) => {
        let weatherCode: number = object.current_weather.weathercode;
        let weatherIconUrl: string = "";
        console.log("El weather Code es:"+ weatherCode);
        switch(weatherCode){
            case(0):
                weatherIconUrl = "./img/weather/sunny.png";
            break;
            case 1: case 2: case 3:
                weatherIconUrl = "./img/weather/clouds_sun.png";
            break;
            case 45: case 48:
                weatherIconUrl = "./img/weather/foggy.png";
            break;
            case 51: case 52: case 53: case 56: case 57:
                weatherIconUrl = "./img/weather/cloudy_rain_sunny.png";
            break;
            case 61: case 63: case 65: case 66: case 67:
                weatherIconUrl = "./img/weather/rain.png";
            break;
            case 71: case 73: case 75: case 77:
                weatherIconUrl = "./img/weather/snow.png";
            break;
            case 80: case 81: case 82: case 85: case 86: case 95: case 96: case 99:
                weatherIconUrl = "./img/weather/storm.png";
            break;
        }
        METEOCONTAINER.innerHTML =
        `<div class="weatherContainer">
        <img src="${weatherIconUrl}"> | ${object.current_weather.temperature} ºC
        </div>
        `
    })
    .catch(error => console.log(error));
} 

BUTTON.addEventListener("click", (e) => {
    if (counter % 2 !== 0) {
        api_url = "https://icanhazdadjoke.com/";
        api_prop = "joke";
        counter++;
    } else {
        api_url = "https://api.chucknorris.io/jokes/random"; 
        api_prop = "value";
        counter++;
    }

    fetch(api_url, {headers: {"Accept": "application/json"}})
    .then(response => response.json())
    .then(object => joke = (object[`${api_prop}`]))
    .then(printJoke)
    .then(showButtons)
    .catch(error => console.log(error));
    if (score !== 0) {
        addToArray();
    }
    changeBackground();
    score = 0;
}
);

VOTEBUTTONS.addEventListener("click", (e)=>{
    const jokeVoted = (e.target as HTMLElement).id;
    const btn1 = document.getElementById("vote1");
    const btn2 = document.getElementById("vote2");
    const btn3 = document.getElementById("vote3");

    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => button.classList.remove("voted"));

    if (jokeVoted === "vote1"){
        addVotedClass(e);
        score = 1;
    } else if (jokeVoted === "vote2"){
        addVotedClass(e);
        score = 2;
    } else if (jokeVoted === "vote3"){
        addVotedClass(e);
        score = 3;
}
})


// FUNCTIONS

function printJoke(){
    JOKECONTAINER.innerHTML = (joke);
}

function showButtons(){
    VOTEBUTTONS.innerHTML = 
    `
    <button type="button" id="vote1" class="voteBtn"></button> 
    <button type="button" id="vote2" class="voteBtn"></button> 
    <button type="button" id="vote3" class="voteBtn"></button> 
    `
}

function addToArray(){
    const date = new Date().toISOString();
    const jokeObj = new JokeObject(joke, score, date);
    reportJokes.push(jokeObj);
    console.log(reportJokes);    
}

function changeBackground(){
    let random = Math.floor(Math.random() * 10);
    const body = document.getElementById("body");
    (body as HTMLElement).className = (`body${random}`);
}

function addVotedClass(e){
    (e.target as HTMLElement).classList.add("voted");
}

// CLASS

class JokeObject{
    joke: string;
    score: number;
    date: string;
    constructor(joke: string, score: number, date:string){
        this.joke = joke;
        this. score = score;
        this. date = date;
    }
}
