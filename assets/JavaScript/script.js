var startButton = document.getElementById('start-button')
var TimerEl = document.getElementById("timer-text")

// This line of code gives testers 90 seconds to answer the questions
let count = 90; 

// Function to begin countdown
startButton.addEventListener("click", function () {
setInterval(function (){
count -= 1;
TimerEl.textContent= count;
}, 1000);
 if (timerEl < 0) {
      timerEl = 0; }
});