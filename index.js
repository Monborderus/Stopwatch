let startTimerButton = document.querySelector(".start-timer");
let waitTimerButton = document.querySelector(".wait-timer");
let reserTimerButton = document.querySelector(".reset-timer");
let timerDisplay = document.querySelector(".timer");
let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime;
let paused = 0;
let running = 0;

function getShowTime(){
    updatedTime = new Date().getTime();
    if (savedTime){
      difference = (updatedTime - startTime) + savedTime;
    } else {
      difference =  updatedTime - startTime;
    }
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    timerDisplay.innerHTML = hours + ' : ' + minutes + ' : ' + seconds;
};

function startTimer(){
  if(!running){
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    paused = 0;
    running = 1;
  } else if (running) {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    paused = 0;
    running = 0;
    timerDisplay.innerHTML = "00 : 00 : 00";
  };

}
waitTimerButton.addEventListener("dblclick", () => {
    if (!difference){
    } else if (!paused) {
      clearInterval(tInterval);
      savedTime = difference;
      paused = 1;
      running = 0;

    } else {
  startTimer();
}});

function resetTimer(){
  clearInterval(tInterval);
  savedTime = 0;
  difference = 0;
  paused = 0;
  running = 0;
  timerDisplay.innerHTML = "00 : 00 : 00";
  startTimer();
};

startTimerButton.addEventListener("click", () => {
    startTimer();
});

reserTimerButton.addEventListener("click", () => {
    resetTimer();
});

timerDisplay.addEventListener("click", () => {
    startTimer();
});
