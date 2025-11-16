const readline = require("readline/promises");
const fs = require("fs/promises");
const { encrypt } = require("./encrypt.js");
const { decrypt } = require("./decrypt.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  console.log("=== Playfair Cipher ===");
  console.log("1) Encrypt text from console");
  console.log("2) Decrypt text from console");
  console.log("3) Encrypt text from file");
  console.log("4) Decrypt text from file");

  const choice = await rl.question("Choose an option (1–4): ");

  if (choice === "1" || choice === "2") {
    const keyword = await rl.question("Enter the keyword: ");
    const text = await rl.question(`Enter the ${choice === "1" ? "plaintext" : "ciphertext"}: `);
    const output = choice === "1" ? encrypt(text, keyword) : decrypt(text, keyword);
    console.log(`\n${choice === "1" ? "Encrypted" : "Decrypted"} text:\n${output}`);
  } else if (choice === "3" || choice === "4") {
    const keyword = await rl.question("Enter the keyword: ");
    const inputPath = await rl.question("Enter input file path: ");
    const outputPath = await rl.question("Enter output file path: ");
    try {
      const fileContent = await fs.readFile(inputPath, "utf-8");
      const output = choice === "3" ? encrypt(fileContent, keyword) : decrypt(fileContent, keyword);
      await fs.writeFile(outputPath, output, "utf-8");
      console.log(
        `\n${choice === "3" ? "Encrypted" : "Decrypted"} content written to: ${outputPath}`
      );
    } catch (err) {
      console.error("File error:", err.message);
    }
  } else {
    console.log("Invalid option. Please choose between 1–4.");
  }

  rl.close();
})();
