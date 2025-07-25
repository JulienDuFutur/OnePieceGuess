const imageElement = document.getElementById("character-image");
const inputElement = document.getElementById("guess-input");
const datalistElement = document.getElementById("characters");
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

async function initGame() {
  const characters = await fetchCharacterList();
  if (characters.length === 0) return;

  // Choisir un personnage aléatoire
  const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
  characterName = randomCharacter.name.toLowerCase();
  imageElement.src = `assets/${randomCharacter.file}`;

  // Remplir datalist pour saisie intelligente
  characters
    .map(c => c.name)
    .sort((a, b) => a.localeCompare(b))
    .forEach(name => {
      const option = document.createElement("option");
      option.value = name;
      datalistElement.appendChild(option);
    });
}

document.getElementById("guess-button").addEventListener("click", () => {
  const guess = inputElement.value.trim().toLowerCase();
  if (!guess) return;

  if (guess === characterName) {
    resultElement.textContent = "Bravo ! C’est la bonne réponse 🎉";
    resultElement.style.color = "green";
  } else {
    resultElement.textContent = "Dommage, essaie encore !";
    resultElement.style.color = "red";
  }
});

initGame();
