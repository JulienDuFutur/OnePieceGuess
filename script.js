const imageElement = document.getElementById("character-image");
const inputElement = document.getElementById("guess-input");
const datalistElement = document.getElementById("characters");
const resultElement = document.getElementById("result");

let characters = [];
let characterName = "";

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

function pickRandomCharacter() {
  const random = characters[Math.floor(Math.random() * characters.length)];
  characterName = random.name.toLowerCase();
  imageElement.src = `assets/${random.file}`;
  inputElement.value = "";
  resultElement.textContent = "";
}

async function initGame() {
  characters = await fetchCharacterList();
  if (characters.length === 0) return;

  // Remplir datalist une seule fois
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

document.getElementById("guess-button").addEventListener("click", () => {
  const guess = inputElement.value.trim().toLowerCase();
  if (!guess) return;

  if (guess === characterName) {
    showResult("Bravo ! C’est la bonne réponse 🎉", "green");
    setTimeout(() => {
      pickRandomCharacter();
    }, 1500);
  } else {
    showResult(`Dommage ! C’était : ${characterName}`, "red");
    setTimeout(() => {
      pickRandomCharacter();
    }, 2000);
  }
});

initGame();
