# Playfair Cipher (Node.js)

## Overview

This project implements the **Playfair cipher**, a classical encryption technique, using Node.js. It includes functionality for:
- Text-based encryption and decryption via CLI
- File-based encryption and decryption
- Modular code organization with reusable helpers

---

## Features

- Accepts input via console or file
- Encrypts or decrypts based on Playfair cipher rules
- Handles repeated characters and odd-length plaintext
- Modular structure for clarity and reusability

---

## File Structure

```
Playfair Cipher JS/
├── encrypt.js      # Contains encryption logic
├── decrypt.js      # Contains decryption logic
├── helpers.js      # Shared matrix/text functions
├── main.js         # CLI interface
├── input.txt       # (Optional) sample input file
├── output.txt      # (Optional) sample output file
```

---

## How to Run

1. **Install Node.js** (if not already):  
   https://nodejs.org/

2. **Run the script:**

   ```bash
   node main.js
   ```

3. **Follow the prompts:**

   ```
   === Playfair Cipher ===
   1) Encrypt text from console
   2) Decrypt text from console
   3) Encrypt text from file
   4) Decrypt text from file
   ```

---

## Example

### Console-based Encryption

```bash
Choose an option (1–4): 1
Enter the keyword: MONARCHY
Enter the plaintext: BALLOON

Encrypted text: IBSUPMNA
```

### File-based Decryption

```bash
Choose an option (1–4): 4
Enter the keyword: MONARCHY
Enter input file path: encrypted.txt
Enter output file path: decrypted.txt

Decrypted content written to: decrypted.txt
```

---

## Cipher Rules Summary

- **Matrix Creation:** Uses a 5x5 matrix based on a keyword, replacing `J` with `I`
- **Digram Handling:**
    - Repeats are split with filler `X` or `Q`
    - Odd-length plaintexts are padded
- **Encryption:**
    - Same row: shift right
    - Same column: shift down
    - Rectangle swap: swap columns
- **Decryption:**
    - Same row: shift left
    - Same column: shift up
    - Rectangle swap: same as encryption

---

## Dependencies

- Node.js only (`fs`, `readline/promises`)
- No external libraries required

---

## License

This project is released under the MIT License.

---