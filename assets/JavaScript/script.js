// variables created via elements in the Document Object Model (DOM)
var startButton = document.getElementById("start-button");
var TimerEl = document.getElementById("timer-text");
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var currentQuestionIndex = 0;

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

getQuestion();

// Function to grab question from array
function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
}

// Update the page title and options with current question and answers
var questionTitleEl = document.getElementById("question-title");
questionTitleEl.textContent = currentQuestion.title;

// Reset choice string empty
  choicesEl.innerHTML = '';