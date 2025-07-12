let keyword = "MONOLITHIC";
let plaintext = "BALLOON DELIVERY BOX";
let matrix = [];

function generateMatrixAlphabet() {
  const alphabet = [];

  for (let i = 0; i < 26; i++) {
    let char = String.fromCharCode(65 + i);

    if (char === "J") continue;
    alphabet.push(char);
  }

  return alphabet;
}

function appendRemainingAlphabet(array) {
  const set = new Set(array);

  for (let letter of generateMatrixAlphabet()) {
    if (!set.has(letter)) {
      set.add(letter);
    }
  }

  return Array.from(set);
}

function create5x5Matrix(array) {
  const letters = appendRemainingAlphabet(array);
  const matrix = [];
  let index = 0;

  for (let row = 0; row < 5; row++) {
    matrix[row] = [];
    for (let col = 0; col < 5; col++) {
      matrix[row][col] = letters[index++];
    }
  }

  return matrix;
}

console.log(create5x5Matrix(keyword));

// const prompt = require('prompt-sync')();

// const name = prompt('What is your name? ');
