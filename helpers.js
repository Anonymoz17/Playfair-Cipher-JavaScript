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
        .replace(/[^A-Z]/g, "")
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

function dissectText(text, interval) {
    let textArray = text.replaceAll(" ", "").split("");
    let result = [];
    for (let i = 0; i < textArray.length; i += interval) {
        result.push(textArray.slice(i, i + interval));
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

module.exports = {
    create5x5Matrix,
    dissectText,
    findPosition
};
