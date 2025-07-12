let keyword = "MONOLITHIC";
let plaintext = "BALLOON DELIVERY BOX";

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
  keyword = keyword.toUpperCase().replace(/J/g, "I");
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

function pickFillerChar(str) {
  const fillerChars = ["X", "Z", "Q"];
  const usedChars = str.split("");

  for (let filler of fillerChars) {
    if (!usedChars.includes(filler)) {
      return filler;
    }
  }

  return "X";
}

function breakupDuplicatesInDigrams(str) {
  let filler = pickFillerChar(str);
  let result = "";

  for (let i = 0; i < str.length; i += 2) {
    let first = str[i];
    let second = str[i + 1];

    if (!second) {
      result += first + filler;
    } else if (first === second) {
      result += first + filler;
      i--;
    } else {
      result += first + second;
    }
  }

  return result;
}

function dissectPlaintext(plaintext, interval) {
  let plaintextArray = plaintext.replaceAll(" ", "").split("");
  let result = [];
  for (let i = 0; i < plaintextArray.length; i += interval) {
    result.push(plaintextArray.slice(i, i + interval));
  }
  return result;
}

function encrypt(plaintext) {
  let matrix = create5x5Matrix(keyword);
  let cleanedText = plaintext
    .replace(/[^A-Z]/gi, "")
    .toUpperCase()
    .replace(/J/g, "I");
  let digrams = dissectPlaintext(breakupDuplicatesInDigrams(cleanedText), 2);
  let result = "";

  for (let pair of digrams) {
    //prettier-ignore
    let temp1 = null;
    let temp2 = null;
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] === pair[0]) {
          temp1 = [row, col];
        }
        if (matrix[row][col] === pair[1]) {
          temp2 = [row, col];
        }
      }
    }

    if (temp1[0] !== temp2[0] && temp1[1] !== temp2[1]) {
      result += matrix[temp1[0]][temp2[1]];
      result += matrix[temp2[0]][temp1[1]];
    } else if (temp1[0] == temp2[0]) {
      result += matrix[temp1[0]][(temp1[1] + 1) % 5];
      result += matrix[temp2[0]][(temp2[1] + 1) % 5];
    } else if (temp1[1] == temp2[1]) {
      result += matrix[(temp1[0] + 1) % 5][temp1[1]];
      result += matrix[(temp2[0] + 1) % 5][temp2[1]];
    }
  }
  return result;
}

console.log(encrypt(plaintext));
