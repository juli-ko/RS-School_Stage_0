const timeOnPage = document.querySelector(".time");
const dateOnPage = document.querySelector(".date");
const greetingOnPage = document.querySelector(".greeting");
const userName = document.querySelector(".name");
const body = document.querySelector("body");
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const windDescription = document.querySelector(".wind-description");
const humidityDescription = document.querySelector(".humidity-description");
const city = document.querySelector(".city");
const weatherErorr = document.querySelector(".weather-error");
const changeQuote = document.querySelector(".change-quote")
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");

let randomNum ='';


function getRandomNum() {
  randomNum = (Math.floor(Math.random() * 20) + 1).toString().padStart(2, "0");
}
getRandomNum();

function showDate() {
    let date = new Date();
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    let currentDate = date.toLocaleDateString("en-US", options);
    dateOnPage.textContent = currentDate;
}

function getTimeOfDay() {
  let date = new Date();
  let hours = date.getHours();
  let timeOfDay = ["night", "morning", "afternoon", "evening"];
  return timeOfDay[Math.floor(hours / 6)];
}

function showGreeting(){
  greetingOnPage.textContent = `Good ${getTimeOfDay()},`;
}

function showTime() {
    let date = new Date();
    let currentTime = date.toLocaleTimeString();
    timeOnPage.textContent = currentTime;
 
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
}

function setLocalStorage() {
  localStorage.setItem("name", userName.value);
  localStorage.setItem("city", city.value);
}

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    userName.value = localStorage.getItem("name");
  }else{
    userName.placeholder = "Enter your name"
  }
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  } else {
    city.value = 'Minsk'
  }
}


function setBackground() {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${randomNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}

function getSlideNext(){
  console.log(randomNum);
  if (randomNum === '20'){
    randomNum = '1'
  }else{
    let num = Number(randomNum)+1;
    randomNum = num.toString().padStart(2, "0");
  }
  setBackground();
}

function getSlidePrev() {
  if (randomNum === "01") {
    randomNum = "20";
  } else {
    let num = Number(randomNum) - 1;
    randomNum = num.toString().padStart(2, "0");
  }
  setBackground();
}

async function getWeather() {  
  try{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=e673e8d25ebd4cc511c40f83d77653ee&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherErorr.textContent = '';
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windDescription.textContent =`Wind speed: ${Math.round(data.wind.speed)}m/s`;
    humidityDescription.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
  }catch{
    weatherErorr.textContent = `${city.value} is not a city`;
    temperature.textContent ='';
    weatherDescription.textContent ='';
    windDescription.textContent ='';
    humidityDescription.textContent ='';
  }
  
}

function setCity(event) {
  if (event.code === "Enter") {
    getWeather();
    city.blur();
  }
} 

async function getQuotes() {
  const quotes = "data.json";
  const res = await fetch(quotes);
  const data = await res.json();
  console.log(data);
}

getQuotes();
showTime();

window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

window.addEventListener("load", getWeather);
city.addEventListener("keypress", setCity);

setBackground();

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);



