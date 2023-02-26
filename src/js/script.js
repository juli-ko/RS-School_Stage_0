//IMPORT MODULES
import playList from "./modules/playlist.js";

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
const player = document.querySelector(".player");
const playBtn = document.querySelector(".play");
const playNextBtn = document.querySelector(".play-next");
const playPrevBtn = document.querySelector(".play-prev");
const playListContainer = document.querySelector(".play-list");
//audioplayer - aditional
const durationBar = document.querySelector(".duration-player");
const durationTimer = document.querySelector(".duration-timer");
const progressBar = document.querySelector(".progress");
const volumeBtn = document.querySelector(".volume-button");
const volumeBar = document.querySelector(".volume-slider");
const songActive = document.querySelector(".song-name");
//settings
const settingsBtn = document.querySelector(".settings-button");
const settings = document.querySelector(".settings");
const settingsToggleLang = document.querySelector(".languge-toggle");
const settingsToggleClock = document.querySelector(".clock-toggle");
const settingsToggleDate = document.querySelector(".date-toggle");
const settingsToggleGreeting = document.querySelector(".greeting-toggle");
const settingsToggleAudio = document.querySelector(".audio-toggle");
const settingsToggleWeather = document.querySelector(".weather-toggle");
const settingsToggleQuote = document.querySelector(".quote-toggle");

//GLOBAL VARIABLE________________________________________________________________________________________________
let randomNum = "";
let orderOfQuote = 0;
let isPlayAudio = false;
let playNum = 0;
let state = {
  language: "en",
  photoSource: "github",
  blocks: ["time", "date", "greeting", "quote", "weather", "audio", "todolist"],
};

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
  if (state.language === "ru") {
    currentDate = date.toLocaleDateString("ru-Ru", options);
  }
  dateOnPage.textContent = currentDate;
}

//for greeting - indicate what time of the day is right now
function getTimeOfDay() {
  let date = new Date();
  let hours = date.getHours();
  let timeOfDay = ["night", "morning", "afternoon", "evening"];
  return timeOfDay[Math.floor(hours / 6)];
}

//translate greeting
function translateGreeting(){
  if ((state.language === "en")) {
    return `Good ${getTimeOfDay()},`;
  } else {
    if (getTimeOfDay()==='night') return "Доброй ночи,";
    if (getTimeOfDay() === "morning") return "Доброе утро,";
    if (getTimeOfDay() === "afternoon") return "Добрый день,";
    if (getTimeOfDay() === "evening") return "Добрый вечер,";
  }   
}

//for greeting - creating phrase like 'good morning,'
function showGreeting() {
  greetingOnPage.textContent = translateGreeting();
}

//for greeting and - renovate time and time of the day every second
function showTime() {
  let date = new Date();
  let currentTime = date.toLocaleTimeString();
  timeOnPage.textContent = currentTime;

  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
  getWeather();
}
showTime();

//for greeting and weather - collecting data in storage
function setLocalStorage() {
  localStorage.setItem("name", userName.value);
  localStorage.setItem("city", city.value);
  localStorage.setItem("settings", state);
}

//for greeting and weather - getting data from storage
function getLocalStorage() {
  if (localStorage.getItem("name")) {
    userName.value = localStorage.getItem("name");
  } else {
    userName.placeholder = "Enter your name";
    if (state.language === 'ru'){
      userName.placeholder = "Ваше имя";
    }
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

//for weather***********************************************************************************************************
//getting weather info from api, showing info on page if city exists
async function getWeather() {
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${state.language}&appid=e673e8d25ebd4cc511c40f83d77653ee&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherErorr.textContent = "";
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    if (state.language ==='en'){
      windDescription.textContent = `Wind speed: ${Math.round(
        data.wind.speed
      )}m/s`;
      humidityDescription.textContent = `Humidity: ${Math.round(
        data.main.humidity
      )}%`;
    }else{
      windDescription.textContent = `Скорость ветра: ${Math.round(
        data.wind.speed
      )}m/s`;
      humidityDescription.textContent = `Влажность: ${Math.round(
        data.main.humidity
      )}%`;
    } 
  } catch { 
    if (state.language ==='ru'){
      weatherErorr.textContent = `${city.value} - это не название города`;
    }else{
      weatherErorr.textContent = `${city.value} is not a city`;
    }

    temperature.textContent = "";
    weatherDescription.textContent = "";
    windDescription.textContent = "";
    humidityDescription.textContent = "";
  }
}

//renovate info about weather, when user press 'Enter' on city-input
function setCity(event) {
  if (event.code === "Enter") {
    getWeather();
    city.blur();
  }
}
window.addEventListener("load", getWeather);
city.addEventListener("keypress", setCity);


//for quotes**************************************************************************************************************
//get random number for the first quote
function getOrderOfQuote(){
  orderOfQuote = Math.floor(Math.random() * 5) 
}

//finding quote in json EN
async function getQuotes() {
  let quotes = "src/js/quotesEn.json";
  if (state.language ==='ru') {
    quotes = "src/js/quotesRu.json";
  }
  const res = await fetch(quotes);
  const data = await res.json();

  quote.textContent = data[orderOfQuote].text;
  author.textContent = data[orderOfQuote].author;
}

//flipping through quotes, get number for the next quote
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

//for audio*************************************************************************************************************** 
//initial volume 
audio.volume = .50;

//'play' button functions
function playAudio() {
  if (isPlayAudio === true) {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    playBtn.classList.add("pause");
  } else {
    audio.pause();
    playBtn.classList.remove("pause");
  } 
  markActiveSong();
}

//button 'play' changing
function toggleBtn() {
  if (isPlayAudio !== true) {
    isPlayAudio = true;
  } else {
    isPlayAudio = false;
  }
  playAudio();
}
playBtn.addEventListener("click", toggleBtn);

//buttons 'prev', 'next'
function getAudioNext() {
  if (playNum === playList.length-1) {
    playNum = 0;
  } else {
    playNum++;
  };
  isPlayAudio = true;
  playAudio() ;
}
function getAudioPrev() {
  if (playNum === 0) {
    playNum = playList.length-1;
  } else {
    playNum -= 1;
  }
  isPlayAudio = true;
  playAudio();
}
playNextBtn.addEventListener("click", getAudioNext);
playPrevBtn.addEventListener("click", getAudioPrev);

//creation list of tracks
function playListCreation(){
  playList.forEach((el) => {
    const li = document.createElement("li");
    li.classList.add("play-item");
    li.textContent = el.title;
    playListContainer.append(li); 
  });
}
playListCreation();

// mark active song
function markActiveSong () {
  document.querySelectorAll(".play-item").forEach((el,index) =>{
    el.classList.remove("item-paused");
    if (index === playNum) {
      el.classList.add("item-active");
    } else {
      el.classList.remove("item-active");
    }
    if (el.classList.contains('item-active')){
      songActive.textContent = el.textContent;
    }
  })
  pauseIco();
}

//active song ico
function pauseIco (){
  let el = document.querySelector(".item-active");
  if (playBtn.classList.contains("pause")) {
    el.classList.add("item-paused");
  } 
}

//automaticaly play the next song
audio.addEventListener("ended", getAudioNext);

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}
//check how long is the music
audio.addEventListener(
  "loadeddata",
  () => {
    document.querySelector(".duration-timer .length").textContent =
      getTimeCodeFromNum(audio.duration);
  },
  false
);

//check audio percentage and update time accordingly
setInterval(() => {
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  document.querySelector(".duration-timer .current").textContent = getTimeCodeFromNum(audio.currentTime);
}, 100);

//click on timeline to skip around
durationBar.addEventListener("click",
  (e) => {
    const timelineWidth = window.getComputedStyle(durationBar).width;
    const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
    audio.currentTime = timeToSeek;
  },
  false
);

//clik on song to play
document.querySelectorAll(".play-item").forEach((el)=> {
  const oneSong = el 
  oneSong.addEventListener(
    "click",
    (song) => {
      document.querySelectorAll(".play-item").forEach((el, index) => {
        if (oneSong.textContent === el.textContent) {
          if (playNum === index && isPlayAudio === true) {
            isPlayAudio = false;
          } else {
            isPlayAudio = true;
          }
          playNum = index;
        }
      });
      playAudio();
    },
    false
  );
});


//for volume*****************************************************************************************************************
//button 'volume off/on'
volumeBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeBtn.classList.remove("volume-on");
    volumeBtn.classList.add("volume-off");
  } else {
    volumeBtn.classList.remove("volume-off");
    volumeBtn.classList.add("volume-on");
  }
});

//click volume slider to change volume
volumeBar.addEventListener("click",
  (e) => {
    const sliderWidth = window.getComputedStyle(volumeBar).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    document.querySelector(".volume-percentage").style.width =
      newVolume * 100 + "%";
  },
  false
);



//for settings****************************************************************************************************************
//open settings window
function openSettings(){
  if (settingsBtn.classList.contains('opened-settings')){
    settingsBtn.classList.remove("opened-settings");
    settings.style.visibility = "hidden";
  }else{
    settingsBtn.classList.add("opened-settings");
    settings.style.visibility = "visible";
  }
}
settingsBtn.addEventListener('click', openSettings)

//change languge toggle button
function changeLang(){
  if (settingsToggleLang.classList.contains("off-toggle")) {
    settingsToggleLang.classList.remove("off-toggle");
    state.language = 'en';
  }else{
    settingsToggleLang.classList.add("off-toggle");
    state.language = "ru";
  } 
  showTime();
  getQuotes();
  setLocalStorage();
  getLocalStorage();
}
settingsToggleLang.addEventListener('click',changeLang)

//hide-open chosen widget
function hideWidget(button, block){
  if (button.classList.contains("off-toggle")) {
    button.classList.remove("off-toggle");
    block.style.opacity = 1;
  } else {
    button.classList.add("off-toggle");
    block.style.opacity = 0;
  } 
}

//hide-open Clock
settingsToggleClock.addEventListener('click',()=>{
  hideWidget(settingsToggleClock, timeOnPage);
})
//hide-open Date
settingsToggleDate.addEventListener('click',() =>{
  hideWidget(settingsToggleDate, dateOnPage);
})
//hide-open Greeting and Name
settingsToggleGreeting.addEventListener("click", () => {
  hideWidget(settingsToggleGreeting, document.querySelector(".greeting-container"));
});
//hide-open Audio player
settingsToggleAudio.addEventListener("click", () => {
  hideWidget(settingsToggleAudio, player);
});
//hide-open Weather
settingsToggleWeather.addEventListener("click", () => {
  hideWidget(settingsToggleWeather, document.querySelector(".weather"));
});
//hide-open Quote
settingsToggleQuote.addEventListener("click", () => {
  hideWidget(settingsToggleQuote, document.querySelector(".quote-block"));
});
