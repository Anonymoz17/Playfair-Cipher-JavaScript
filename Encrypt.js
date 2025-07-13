function generateMatrixAlphabet() {
  const alphabet = [];

  for (let i = 0; i < 26; i++) {
    let char = String.fromCharCode(65 + i);

    if (char === "J") continue;
    alphabet.push(char);
  }

  return alphabet;
}

function appendRemainingAlphabet(keyword) {
  keyword = keyword
    .toUpperCase()
    .replace(/[^A-Z]/g, "") // removes anything not A–Z
    .replace(/J/g, "I");
  const seen = new Set();
  const result = [];

  for (let char of keyword) {
    if (!seen.has(char) && char >= "A" && char <= "Z") {
      seen.add(char);
      result.push(char);
    }
  }

  for (let char of generateMatrixAlphabet()) {
    if (!seen.has(char)) {
      result.push(char);
    }
  }

  return result;
}

function create5x5Matrix(keyword) {
  const letters = appendRemainingAlphabet(keyword);
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

function pickFillerChar(letter) {
  return letter === "X" ? "Q" : "X";
}

function breakupDuplicatesInDigrams(str) {
  let result = "";

  for (let i = 0; i < str.length; i += 2) {
    let first = str[i];
    let second = str[i + 1];

    if (!second) {
      result += first + pickFillerChar(first);
    } else if (first === second) {
      result += first + pickFillerChar(first);
      i--;
    } else {
      result += first + second;
    }
  }

  return result;
}

// slicing text in intervals
function dissectPlaintext(plaintext, interval) {
  let plaintextArray = plaintext.replaceAll(" ", "").split("");
  let result = [];
  for (let i = 0; i < plaintextArray.length; i += interval) {
    result.push(plaintextArray.slice(i, i + interval));
  }
  return result;
}

function findPosition(matrix, char) {
  for (let row = 0; row < matrix.length; row++) {
    let col = matrix[row].indexOf(char);
    if (col !== -1) {
      return [row, col];
    }
  }
  return null;
}

function encrypt(plaintext, keyword) {
  let matrix = create5x5Matrix(keyword);
  let cleanedText = plaintext
    .replace(/[^A-Z]/gi, "")
    .toUpperCase()
    .replace(/J/g, "I");
  let digrams = dissectPlaintext(breakupDuplicatesInDigrams(cleanedText), 2);
  let result = "";

  for (let pair of digrams) {
    let [r1, c1] = findPosition(matrix, pair[0]);
    let [r2, c2] = findPosition(matrix, pair[1]);

    if (r1 !== r2 && c1 !== c2) {
      result += matrix[r1][c2];
      result += matrix[r2][c1];
    } else if (r1 == r2) {
      result += matrix[r1][(c1 + 1) % 5];
      result += matrix[r2][(c2 + 1) % 5];
    } else if (c1 == c2) {
      result += matrix[(r1 + 1) % 5][c1];
      result += matrix[(r2 + 1) % 5][c2];
    }
  }
  return result;
}

module.exports = { encrypt };
