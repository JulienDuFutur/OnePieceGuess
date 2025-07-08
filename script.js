const correctAnswer = "Goku";

function checkGuess() {
  const userGuess = document.getElementById("guess").value.trim().toLowerCase();
  const message = document.getElementById("message");

  if (userGuess === correctAnswer.toLowerCase()) {
    message.textContent = "✅ Bravo ! C'était bien Goku.";
    message.style.color = "lightgreen";
  } else {
    message.textContent = "❌ Mauvaise réponse. Réessaie.";
    message.style.color = "tomato";
  }
}
