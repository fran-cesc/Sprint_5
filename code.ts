const JOKECONTAINER = <HTMLInputElement>document.querySelector(".jokeContainer");
const API_METEO_URL: string = "https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&hourly=temperature_2m,precipitation_probability,windspeed_10m&current_weather=true&timezone=auto";
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
        METEOCONTAINER.innerHTML =`
        Temperatura actual: ${object.current_weather.temperature} ºC
        <br>
        Velocitat del vent: ${object.current_weather.windspeed} Km/h
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
    score = 0;
}
);

VOTEBUTTONS.addEventListener("click", (e)=>{
    const jokeVoted = (e.target as HTMLElement).id;
    const btn1 = document.getElementById("vote1");
    const btn2 = document.getElementById("vote2");
    const btn3 = document.getElementById("vote3");
    switch(jokeVoted){
        case ("vote1"):
            (e.target as HTMLElement).classList.add("voted");
            (btn2 as HTMLElement).classList.remove("voted");
            (btn3 as HTMLElement).classList.remove("voted");
            score = 1;
        break;
        case ("vote2"):
            (e.target as HTMLElement).classList.add("voted");
            (btn1 as HTMLElement).classList.remove("voted");
            (btn3 as HTMLElement).classList.remove("voted");
            score = 2;
        break;
        case ("vote3"):
            (e.target as HTMLElement).classList.add("voted");
            (btn2 as HTMLElement).classList.remove("voted");
            (btn1 as HTMLElement).classList.remove("voted");
            score = 3;
        break;
        default:
            score = 0;
    }
} )


// FUNCTIONS

function printJoke(){
    JOKECONTAINER.innerHTML = (joke);
}

function showButtons(){
    VOTEBUTTONS.innerHTML = 
    `
    <p class="buttonsTitle">Rate this joke:</p>
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
