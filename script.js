const imageElement = document.getElementById("character-image");
const selectElement = document.getElementById("guess-select");
const resultElement = document.getElementById("result");
let characterName = "";

async function fetchCharacterList() {
  const response = await fetch("assets/list.json");
  const imageFiles = await response.json();

  const characterNames = imageFiles.map(file => {
    const name = file.replace(".jpg", "").replace(/_/g, " ");
    return { file, name };
  });

  return characterNames;
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

async function initGame() {
  const characters = await fetchCharacterList();
  if (characters.length === 0) return;

  const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
  characterName = randomCharacter.name.toLowerCase();
  imageElement.src = `assets/${randomCharacter.file}`;

  // Remplir la liste déroulante
  const sorted = characters.map(c => c.name).sort((a, b) => a.localeCompare(b));
  for (const name of sorted) {
    const option = document.createElement("option");
    option.value = name.toLowerCase();
    option.textContent = name;
    selectElement.appendChild(option);
  }
}

document.getElementById("guess-button").addEventListener("click", () => {
  const guess = selectElement.value.toLowerCase();
  if (!guess) return;

  if (guess === characterName) {
    imageElement.style.filter = "blur(0)";
    resultElement.textContent = "Bravo ! C’est la bonne réponse 🎉";
    resultElement.style.color = "green";
  } else {
    resultElement.textContent = "Dommage, essaie encore !";
    resultElement.style.color = "red";
  }
});

initGame();
