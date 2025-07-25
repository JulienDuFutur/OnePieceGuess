const imageElement = document.getElementById("character-image");
const inputElement = document.getElementById("guess-input");
const datalistElement = document.getElementById("characters");
const resultElement = document.getElementById("result");
const passButton = document.getElementById("pass-button");

let characters = [];
let characterName = "";
let remainingTries = 3;
let currentStreak = 0;

function updateStreakDisplay() {
  document.getElementById("streak").textContent = `Série : ${currentStreak} ✅`;
}

async function fetchCharacterList() {
  const response = await fetch("assets/list.json");
  const imageFiles = await response.json();

  return imageFiles.map(file => {
    const name = file.replace(".jpg", "").replace(/_/g, " ");
    return { file, name };
  });
}

function showResult(message, color) {
  resultElement.textContent = message;
  resultElement.style.color = color;
}

function displayHint() {
  const name = characterName;
  if (remainingTries === 2) {
    const hint = "_ ".repeat(name.length).trim();
    showResult(`Indice : ${hint}`, "orange");
  } else if (remainingTries === 1) {
    const hint = `${name[0].toUpperCase()}${"_ ".repeat(name.length - 1)}`.trim();
    showResult(`Indice : ${hint}`, "orange");
  }
}

function pickRandomCharacter() {
  const random = characters[Math.floor(Math.random() * characters.length)];
  characterName = random.name.toLowerCase();
  imageElement.src = `assets/${random.file}`;
  inputElement.value = "";
  resultElement.textContent = "";
  remainingTries = 3;
  updateStreakDisplay();
}

function handleGuess(guess) {
  if (!guess) return;

  if (guess === characterName) {
    currentStreak++;
    showResult("Bravo ! C’est la bonne réponse 🎉", "green");
    setTimeout(() => pickRandomCharacter(), 1500);
  } else {
    remainingTries--;
    currentStreak = 0;
    if (remainingTries > 0) {
      displayHint();
    } else {
      showResult(`Perdu ! C’était : ${characterName}`, "red");
      setTimeout(() => pickRandomCharacter(), 3000);
    }
  }
}


document.getElementById("guess-button").addEventListener("click", () => {
  const guess = inputElement.value.trim().toLowerCase();
  handleGuess(guess);
});

passButton.addEventListener("click", () => {
  currentStreak = 0;
  showResult(`C’était : ${characterName}`, "gray");
  setTimeout(() => pickRandomCharacter(), 3000);
});


async function initGame() {
  characters = await fetchCharacterList();
  if (characters.length === 0) return;

  datalistElement.innerHTML = "";
  characters
    .map(c => c.name)
    .sort((a, b) => a.localeCompare(b))
    .forEach(name => {
      const option = document.createElement("option");
      option.value = name;
      datalistElement.appendChild(option);
    });

  pickRandomCharacter();
}

initGame();
