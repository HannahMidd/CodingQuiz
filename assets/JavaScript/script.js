// variables created via elements in the Document Object Model (DOM)
var startButton = document.getElementById("start-button");
var TimerEl = document.getElementById("timer-text");
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var endScreenEl = document.getElementById("end-of-game");
var finalScoreEl = document.getElementById("final-score");
var currentQuestionIndex = 0;
var time = questions.length * 15;

// 90 second timer count and function to begin countdown
startButton.addEventListener("click", function () {
  let count = 90;
  timer = setInterval(function () {
    count -= 1;
    TimerEl.textContent = count;

    // Check if the timer has reached 0
    if (count === 0) {
      // Stop the timer
      clearInterval(timer);
      console.log("Timer stopped at 0.");
    }
  }, 1000);
});

// Hides previous quiz messages
function beginQuiz() {
  var startEl = document.getElementById("start-screen");
  startEl.setAttribute("class", "hide");
  //   Event listener to begin quiz
  startButton.addEventListener("click", beginQuiz);
  // Unhides questions
  questionsEl.removeAttribute("class");

  getQuestion();
}

// Function to grab question from array
function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  // Update the page title and options with current question and answers
  var questionTitleEl = document.getElementById("question-title");
  questionTitleEl.textContent = currentQuestion.title;

  // Reset choice string empty
  choicesEl.innerHTML = "";

  //   For loop to go through questions 1 by 1
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    // creating buttons
    var choice = currentQuestion.choices[i];
    var choiceButton = document.createElement("button");
    choiceButton.setAttribute("class", "choice");
    choiceButton.setAttribute("value", choice);
    choiceButton.textContent = i + 1 + ". " + choice;

    // To show on page, we need to append the answer options
    choicesEl.appendChild(choiceButton);
  }
}

function questionClick(event) {
  var buttonEl = event.target;

  //   If question was answered wrong
  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    // Minus 15 seconds from clock
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    feedbackEl.textContent = "Wrong!";
  } else {
    feedbackEl.textContent = "Correct!";
  }

  // flash right/wrong feedback on page for 1 second
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  //   Grab next question unless we are out of questions
  currentQuestionIndex++;
  if (time <= 0 || currentQuestionIndex === questions.length) {
    endOfQuiz();
  } else {
    getQuestion();
  }
}

// End of Quiz Section
function endOfQuiz() {
  // Will stop timer if there was still time left
  clearInterval(timer);
  endScreenEl.removeAttribute("class");

  // Hide questions
  questionsEl.setAttribute("class", "hide");

  // Display final score
  finalScoreEl.textContent = time;
}

// Clicks
startButton.onclick = beginQuiz;
choicesEl.onclick = questionClick;
