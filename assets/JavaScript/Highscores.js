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
