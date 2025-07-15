const readline = require("readline/promises");
const { encrypt } = require("./encrypt.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  const keyword = await rl.question("Enter the keyword: ");
  const plaintext = await rl.question("Enter the plaintext: ");
  const ciphertext = encrypt(plaintext, keyword);
  console.log("Encrypted text: ", ciphertext);
  rl.close();
})();
