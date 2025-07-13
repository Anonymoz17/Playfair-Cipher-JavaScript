const readline = require("readline");
const { encrypt } = require("./encrypt.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the keyword: ", (keyword) => {
  rl.question("Enter the plaintext: ", (plaintext) => {
    const ciphertext = encrypt(plaintext, keyword);
    console.log("Encrypted text:", ciphertext);
    rl.close();
  });
});
