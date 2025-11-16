#!/usr/bin/env node

/**
 * Playfair Cipher CLI
 * Professional command-line interface for encryption/decryption
 */

const { program } = require("commander");
const fs = require("fs/promises");
const readline = require("readline/promises");
const { encrypt, decrypt } = require("./index.js");

const packageJson = require("./package.json");

// Interactive mode function
async function interactiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    console.log("\n╔════════════════════════════════════════╗");
    console.log("║  Playfair Cipher - Interactive Mode   ║");
    console.log("╚════════════════════════════════════════╝\n");

    console.log("1) Encrypt text from console");
    console.log("2) Decrypt text from console");
    console.log("3) Encrypt text from file");
    console.log("4) Decrypt text from file");
    console.log("5) Exit\n");

    const choice = await rl.question("Choose an option (1–5): ");

    switch (choice) {
      case "1":
      case "2": {
        const keyword = await rl.question("Enter the keyword: ");
        const text = await rl.question(
          `Enter the ${choice === "1" ? "plaintext" : "ciphertext"}: `
        );

        if (!keyword.trim()) {
          console.error("\n❌ Error: Keyword cannot be empty");
          break;
        }
        if (!text.trim()) {
          console.error("\n❌ Error: Text cannot be empty");
          break;
        }

        const output = choice === "1" ? encrypt(text, keyword) : decrypt(text, keyword);
        console.log(
          `\n✅ ${choice === "1" ? "Encrypted" : "Decrypted"} text:\n${output}\n`
        );
        break;
      }

      case "3":
      case "4": {
        const keyword = await rl.question("Enter the keyword: ");
        const inputPath = await rl.question("Enter input file path: ");
        const outputPath = await rl.question("Enter output file path: ");

        if (!keyword.trim()) {
          console.error("\n❌ Error: Keyword cannot be empty");
          break;
        }

        try {
          const fileContent = await fs.readFile(inputPath, "utf-8");
          const output = choice === "3" ? encrypt(fileContent, keyword) : decrypt(fileContent, keyword);
          await fs.writeFile(outputPath, output, "utf-8");
          console.log(
            `\n✅ ${choice === "3" ? "Encrypted" : "Decrypted"} content written to: ${outputPath}\n`
          );
        } catch (err) {
          console.error(`\n❌ File error: ${err.message}\n`);
        }
        break;
      }

      case "5":
        console.log("Goodbye!\n");
        break;

      default:
        console.error("\n❌ Invalid option. Please choose between 1–5.\n");
    }
  } finally {
    rl.close();
  }
}

// Configure Commander
program.version(packageJson.version, "-v, --version").description(packageJson.description);

// Encrypt command
program
  .command("encrypt <text> <keyword>")
  .description("Encrypt text using Playfair cipher")
  .option("-o, --output <file>", "Output to file instead of console")
  .action(async (text, keyword, options) => {
    try {
      const result = encrypt(text, keyword);
      if (options.output) {
        await fs.writeFile(options.output, result, "utf-8");
        console.log(`✅ Encrypted content written to: ${options.output}`);
      } else {
        console.log(`\n✅ Encrypted text:\n${result}\n`);
      }
    } catch (err) {
      console.error(`❌ Error: ${err.message}`);
      process.exit(1);
    }
  });

// Decrypt command
program
  .command("decrypt <text> <keyword>")
  .description("Decrypt text using Playfair cipher")
  .option("-o, --output <file>", "Output to file instead of console")
  .action(async (text, keyword, options) => {
    try {
      const result = decrypt(text, keyword);
      if (options.output) {
        await fs.writeFile(options.output, result, "utf-8");
        console.log(`✅ Decrypted content written to: ${options.output}`);
      } else {
        console.log(`\n✅ Decrypted text:\n${result}\n`);
      }
    } catch (err) {
      console.error(`❌ Error: ${err.message}`);
      process.exit(1);
    }
  });

// Encrypt file command
program
  .command("encrypt-file <inputFile> <outputFile> <keyword>")
  .description("Encrypt text from file")
  .action(async (inputFile, outputFile, keyword) => {
    try {
      const content = await fs.readFile(inputFile, "utf-8");
      const result = encrypt(content, keyword);
      await fs.writeFile(outputFile, result, "utf-8");
      console.log(`✅ Encrypted content written to: ${outputFile}`);
    } catch (err) {
      console.error(`❌ Error: ${err.message}`);
      process.exit(1);
    }
  });

// Decrypt file command
program
  .command("decrypt-file <inputFile> <outputFile> <keyword>")
  .description("Decrypt text from file")
  .action(async (inputFile, outputFile, keyword) => {
    try {
      const content = await fs.readFile(inputFile, "utf-8");
      const result = decrypt(content, keyword);
      await fs.writeFile(outputFile, result, "utf-8");
      console.log(`✅ Decrypted content written to: ${outputFile}`);
    } catch (err) {
      console.error(`❌ Error: ${err.message}`);
      process.exit(1);
    }
  });

// Interactive mode command
program
  .command("interactive")
  .alias("i")
  .description("Run in interactive mode (default if no command given)")
  .action(interactiveMode);

// Help command
program
  .command("help")
  .description("Show help")
  .action(() => {
    program.outputHelp();
  });

// If no command provided, run interactive mode
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  interactiveMode();
}
