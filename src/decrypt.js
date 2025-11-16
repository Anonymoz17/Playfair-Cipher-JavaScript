const { findPosition, create5x5Matrix, dissectText } = require("./helpers.js");

function mod(n, m) {
    return ((n % m) + m) % m;
}

function decrypt(ciphertext, keyword) {
    let matrix = create5x5Matrix(keyword);
    let cleanedText = ciphertext
        .replace(/[^A-Z]/gi, "")
        .toUpperCase()
        .replace(/J/g, "I");

    let digrams = dissectText(cleanedText, 2);
    let result = "";

    for (let pair of digrams) {
        let [r1, c1] = findPosition(matrix, pair[0]);
        let [r2, c2] = findPosition(matrix, pair[1]);

        if (r1 !== r2 && c1 !== c2) {
            result += matrix[r1][c2];
            result += matrix[r2][c1];
        } else if (r1 === r2) {
            result += matrix[r1][mod(c1 - 1, 5)];
            result += matrix[r2][mod(c2 - 1, 5)];
        } else if (c1 === c2) {
            result += matrix[mod(r1 - 1, 5)][c1];
            result += matrix[mod(r2 - 1, 5)][c2];
        }
    }

    return result;
}

module.exports = { decrypt };
