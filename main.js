const readline = require("readline/promises");
const { encrypt } = require("./encrypt.js");
const { decrypt } = require("./decrypt.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  console.log("=== Playfair Cipher ===");
  console.log("1) Encrypt");
  console.log("2) Decrypt");
  const choice = await rl.question("Choose an option (1 or 2): ");

  if (choice === "1") {
    const keyword = await rl.question("Enter the keyword: ");
    const plaintext = await rl.question("Enter the plaintext: ");
    const ciphertext = encrypt(plaintext, keyword);
    console.log("\nEncrypted text:", ciphertext);
  } else if (choice === "2") {
    const keyword = await rl.question("Enter the keyword: ");
    const ciphertext = await rl.question("Enter the ciphertext: ");
    const plaintext = decrypt(ciphertext, keyword);
    console.log("\nDecrypted text:", plaintext);
  } else {
    console.log("Invalid option. Please choose 1 or 2.");
  }

  rl.close();
})();
