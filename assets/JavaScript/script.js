// variables created via elements in the Document Object Model (DOM)
var startButton = document.getElementById("start-button");
var TimerEl = document.getElementById("timer-text");
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// Timer count that gives testers 90 seconds to answer all questions
let count = 90;

// Function to begin countdown
startButton.addEventListener("click", function () {
  setInterval(function () {
    count -= 1;
    TimerEl.textContent = count;
  }, 1000);
});

// Hides previous quiz messages
function beginQuiz() {
  var beginQuizEl = document.getElementById("start-screen");
  beginQuizEl.setAttribute("class", "hide");
}

// Unhides questions
questionsEl.removeAttribute("class");

// left off around line 33
