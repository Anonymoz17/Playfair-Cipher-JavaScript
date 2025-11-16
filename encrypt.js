const { create5x5Matrix, dissectText, findPosition } = require("./helpers.js");

function pickFillerChar(letter) {
  return letter === "X" ? "Q" : "X";
}

function breakupDuplicatesInDigrams(str) {
  let result = "";

  for (let i = 0; i < str.length; i += 2) {
    const first = str[i];
    const second = str[i + 1];

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

function encrypt(plaintext, keyword) {
  const matrix = create5x5Matrix(keyword);
  const cleanedText = plaintext
    .replace(/[^A-Z]/gi, "")
    .toUpperCase()
    .replace(/J/g, "I");
  const digrams = dissectText(breakupDuplicatesInDigrams(cleanedText), 2);
  let result = "";

  for (const pair of digrams) {
    const [r1, c1] = findPosition(matrix, pair[0]);
    const [r2, c2] = findPosition(matrix, pair[1]);

    if (r1 !== r2 && c1 !== c2) {
      result += matrix[r1][c2];
      result += matrix[r2][c1];
    } else if (r1 === r2) {
      result += matrix[r1][(c1 + 1) % 5];
      result += matrix[r2][(c2 + 1) % 5];
    } else if (c1 === c2) {
      result += matrix[(r1 + 1) % 5][c1];
      result += matrix[(r2 + 1) % 5][c2];
    }
  }
  return result;
}

module.exports = { encrypt };
