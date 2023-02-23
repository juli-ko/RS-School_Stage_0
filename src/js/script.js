
//GLOBAL CONSTANTS______________________________________________________________________________________________

//greeting+time
const timeOnPage = document.querySelector(".time");
const dateOnPage = document.querySelector(".date");
const greetingOnPage = document.querySelector(".greeting");
const userName = document.querySelector(".name");
//background
const body = document.querySelector("body");
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
//weather
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const windDescription = document.querySelector(".wind-description");
const humidityDescription = document.querySelector(".humidity-description");
const city = document.querySelector(".city");
const weatherErorr = document.querySelector(".weather-error");
//quotes
const changeQuote = document.querySelector(".change-quote");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
//audioplayer
const audio = new Audio();
const playBtn = document.querySelector(".play");
const playNextBtn = document.querySelector(".play-prev");
const playPrevBtn = document.querySelector(".play-next");


//GLOBAL VARIABLE________________________________________________________________________________________________
let randomNum = "";
let orderOfQuote = 0;
let isPlayAudio = false;

//FUNCTIONS______________________________________________________________________________________________________

//for background setting - getting random nuber fom 1 to 10
function getRandomNum() {
  randomNum = (Math.floor(Math.random() * 20) + 1).toString().padStart(2, "0");
}
getRandomNum();

//for date - indicate and showing current date
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

//for greeting - indicate what time of the day is right now
function getTimeOfDay() {
  let date = new Date();
  let hours = date.getHours();
  let timeOfDay = ["night", "morning", "afternoon", "evening"];
  return timeOfDay[Math.floor(hours / 6)];
}

//for greeting - creating phrase like 'good morning,'
function showGreeting() {
  greetingOnPage.textContent = `Good ${getTimeOfDay()},`;
}

//for greeting and - renovate time and time of the day every second
function showTime() {
  let date = new Date();
  let currentTime = date.toLocaleTimeString();
  timeOnPage.textContent = currentTime;

  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}
showTime();

//for greeting and weather - collecting data in storage
function setLocalStorage() {
  localStorage.setItem("name", userName.value);
  localStorage.setItem("city", city.value);
}

//for greeting and weather - getting data from storage
function getLocalStorage() {
  if (localStorage.getItem("name")) {
    userName.value = localStorage.getItem("name");
  } else {
    userName.placeholder = "Enter your name";
  }
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  } else {
    city.value = "Minsk";
  }
}
window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

//for background - show backgroud when image is onloaded
function setBackground() {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${randomNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}

//for background - fuctions for flipping image which order equal to randomNum
function getSlideNext() {
  if (randomNum === "20") {
    randomNum = "1";
  } else {
    let num = Number(randomNum) + 1;
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

setBackground();
slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

//for weather - getting weather info from api, showing info on page if city exists
async function getWeather() {
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=e673e8d25ebd4cc511c40f83d77653ee&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherErorr.textContent = "";
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windDescription.textContent = `Wind speed: ${Math.round(
      data.wind.speed
    )}m/s`;
    humidityDescription.textContent = `Humidity: ${Math.round(
      data.main.humidity
    )}%`;
  } catch {
    weatherErorr.textContent = `${city.value} is not a city`;
    temperature.textContent = "";
    weatherDescription.textContent = "";
    windDescription.textContent = "";
    humidityDescription.textContent = "";
  }
}

//for weather - renovate info about weather, when user press 'Enter' on city-input
function setCity(event) {
  if (event.code === "Enter") {
    getWeather();
    city.blur();
  }
}
window.addEventListener("load", getWeather);
city.addEventListener("keypress", setCity);


//for quotes - get random number for the first quote
function getOrderOfQuote(){
  orderOfQuote = Math.floor(Math.random() * 5) 
}

//for quotes - finding quote in json EN
async function getQuotes() {
  const quotes = "src/js/quotesEn.json";
  const res = await fetch(quotes);
  const data = await res.json();

  quote.textContent = data[orderOfQuote].text;
  author.textContent = data[orderOfQuote].author;
}

//for quotes - flipping through quotes, get number for the next quote
function getQwoteNext() {
  console.log(orderOfQuote);
  if (orderOfQuote === 4) {
    orderOfQuote = 0;
  } else {
    orderOfQuote++
  }
  getQuotes();
}
getOrderOfQuote();
getQuotes();
changeQuote.addEventListener("click", getQwoteNext);

//for audio - play button functions
function playAudio() {
  audio.src = "https://7oom.ru/audio/naturesounds/07%20Birds%20(7oom.ru).mp3";
  audio.currentTime = 0;
  audio.play();
}
function pauseAudio() {
  audio.pause();
}

//for audio - button



