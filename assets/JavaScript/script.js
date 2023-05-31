// -------------Variables in the Document Object Model (DOM)------------------------

var startBtn = document.getElementById("start-button");
var timerEl = document.getElementById("timer-text");
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var endScreenEl = document.getElementById("end-of-game");
var finalScoreEl = document.getElementById("final-score");

var currentQuestionIndex = 0;
var time = 90;
var timer;

// ----------------------Begin 90 second timer count ------------------------------
startBtn.addEventListener("click", function () {
  time = 90;
  let count = 90;
  var timer = setInterval(function () {
    time -= 1;
    timerEl.textContent = time;

    // Check if the timer has reached 0
    if (time === 0) {
      // Stop the timer
      clearInterval(timer);
      console.log("Timer stopped at 0.");
    }
  }, 1000);
});

// ----------------------------------Begin Quiz Section-------------------------------

function beginQuiz() {
  var startEl = document.getElementById("start-screen");
  startEl.setAttribute("class", "hide");
  // Unhides questions
  questionsEl.removeAttribute("class");
  getQuestion();
}

// ----------------------------------Get Question Section-------------------------------
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

// ----------------------------------Question Click Section-------------------------------

function questionClick(event) {
  var buttonEl = event.target;
   setInterval(() => {
   }, interval);(function () {
      feedbackEl.setAttribute("class", "feedback-hide");
    }, 1000);
    
  }, interval);

  // If question was answered wrong
  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    // Minus 15 seconds from clock
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    // Reflect time loss on page
    timerEl.textContent = time;
    // --------------------------------Feedback Section ---------------------------------
    // If wrong

    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
  } else {
    // If correct

    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
  }

  hideFeedback();

  // flash right/wrong feedback on page for 1 second
  function hideFeedback() {
    
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
      feedbackEl.setAttribute("class", "feedback-hide");
    }, 1000);
    
  }

  // Grab next question unless we are out of questions
  currentQuestionIndex++;
  if (time <= 0 || currentQuestionIndex === questions.length) {
    endOfQuiz();
  } else {
    getQuestion();
  }
}

// ----------------------------------End of Quiz Section-------------------------------
function endOfQuiz() {
  // Will stop timer if there was still time left
  clearInterval(timer);
  // Unhides end screen
  endScreenEl.removeAttribute("class");
  // Hides questions
  questionsEl.setAttribute("class", "hide");
  // Display final score
  finalScoreEl.textContent = time;
}

// -------------------------------Highscore Section---------------------------------------
function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // Push to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // Pull up highscores HTML file
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}
// Clicks
startBtn.onclick = beginQuiz;
choicesEl.onclick = questionClick;
submitBtn.onclick = saveHighscore;
initialsEl.onkeyup = checkForEnter;
