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

function hideFeedback() {
  setTimeout(function () {
    feedbackEl.style.display = "none";
    getQuestion();
  }, 1000);
}
function questionClick(event) {
  var buttonEl = event.target;

  // If question was answered wrong
  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    // Minus 15 seconds from clock
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    // Reflect time loss on page
    feedbackEl.style.display = "block";
    timerEl.textContent = time;
    // --------------------------------Feedback Section ---------------------------------
    // If wrong

    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    if (time <= 0 || currentQuestionIndex === questions.length) {
      endOfQuiz();
      hideFeedback();
    } else {
      hideFeedback();
      currentQuestionIndex++;
    }
  } else {
    // If correct

    feedbackEl.style.display = "block";
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    if (time <= 0 || currentQuestionIndex === questions.length) {
      endOfQuiz();
      hideFeedback();
    } else {
      currentQuestionIndex++;
      hideFeedback();
    }
  }

  // flash right/wrong feedback on page for 1 second

  // Grab next question unless we are out of questions
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

// --------------------------------Show Highscores Section-----------------------------
function showHighscores() {
  // grab scores from localstorage or begin empty array
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // Shows Highscores, best first
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  for (var i = 0; i < highscores.length; i += 1) {
    // create li tag for each high score
    var liTag = document.createElement("li");
    liTag.textContent = highscores[i].initials + " - " + highscores[i].score;

    // display on page
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  }
}

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

// call the function
showHighscores();

// ------------------------------------ Clicks -----------------------------------------------
startBtn.onclick = beginQuiz;
choicesEl.onclick = questionClick;
submitBtn.onclick = saveHighscore;
initialsEl.onkeyup = checkForEnter;
