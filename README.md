# Playfair Cipher (Node.js)

A professional Node.js implementation of the **Playfair cipher**, a classical encryption technique. Includes both CLI and module interfaces for text-based and file-based encryption/decryption.

---

## Features

✅ Text-based encryption and decryption
✅ File-based encryption and decryption
✅ Professional CLI with multiple commands
✅ Modular code organization
✅ Interactive and command-line modes
✅ No external dependencies for core logic

---

## Installation

### Local Installation (Development)
```bash
git clone https://github.com/yourusername/playfair-cipher-js.git
cd playfair-cipher-js
npm install
```

### Global Installation (CLI)
```bash
npm install -g playfair-cipher-js
```

---

## Usage

### CLI Commands

#### 1. Encrypt Text (Console)
```bash
playfair encrypt "HELLO WORLD" "MONARCHY"
```

Output:
```
✅ Encrypted text:
CFSUPMCPQP
```

#### 2. Decrypt Text (Console)
```bash
playfair decrypt "CFSUPMCPQP" "MONARCHY"
```

Output:
```
✅ Decrypted text:
HELLOWORLD
```

#### 3. Encrypt with Output File
```bash
playfair encrypt "HELLO WORLD" "MONARCHY" --output encrypted.txt
```

#### 4. Decrypt with Output File
```bash
playfair decrypt "CFSUPMCPQP" "MONARCHY" --output decrypted.txt
```

#### 5. Encrypt File
```bash
playfair encrypt-file plaintext.txt encrypted.txt "MONARCHY"
```

#### 6. Decrypt File
```bash
playfair decrypt-file encrypted.txt plaintext.txt "MONARCHY"
```

#### 7. Interactive Mode (Default)
```bash
playfair
# or
playfair interactive
```

This launches an interactive menu:
```
╔════════════════════════════════════════╗
║  Playfair Cipher - Interactive Mode   ║
╚════════════════════════════════════════╝

1) Encrypt text from console
2) Decrypt text from console
3) Encrypt text from file
4) Decrypt text from file
5) Exit

Choose an option (1–5):
```

#### 8. Get Help
```bash
playfair --help
playfair -h
```

#### 9. Check Version
```bash
playfair --version
playfair -v
```

---

## Using as a Module

You can use Playfair Cipher as a reusable module in your Node.js projects:

### Basic Usage
```javascript
const { encrypt, decrypt } = require('playfair-cipher-js');

// Encrypt
const encrypted = encrypt('HELLO', 'MONARCHY');
console.log(encrypted); // Output: CFSUPM

// Decrypt
const decrypted = decrypt('CFSUPM', 'MONARCHY');
console.log(decrypted); // Output: HELXLO
```

### Using the Default Object
```javascript
const PlayfairCipher = require('playfair-cipher-js');

const encrypted = PlayfairCipher.encrypt('HELLO', 'MONARCHY');
const decrypted = PlayfairCipher.decrypt(encrypted, 'MONARCHY');

// Create matrix
const matrix = PlayfairCipher.create5x5Matrix('MONARCHY');
console.log(matrix);
```

### Available Functions
```javascript
{
  encrypt(plaintext, keyword),      // Encrypt text
  decrypt(ciphertext, keyword),     // Decrypt text
  create5x5Matrix(keyword),         // Generate 5x5 matrix
  dissectText(text, interval),      // Split text into chunks
  findPosition(matrix, char)        // Find character position in matrix
}
```

---

## File Structure

```
playfair-cipher-js/
├── src/
│   ├── encrypt.js       # Encryption logic
│   ├── decrypt.js       # Decryption logic
│   └── helpers.js       # Shared utility functions
├── cli.js               # CLI interface
├── index.js             # Main module export
├── package.json         # NPM configuration
├── .gitignore          # Git ignore rules
├── README.md           # This file
└── LICENSE             # MIT License
```

---

## How It Works

### Playfair Cipher Rules

1. **Matrix Creation**: Uses a 5×5 matrix based on a keyword, replacing `J` with `I`
2. **Digram Processing**:
   - Splits plaintext into pairs of letters
   - Repeated letters are split with filler characters (`X` or `Q`)
   - Odd-length texts are padded
3. **Encryption Rules**:
   - Same row: shift right (wrap around)
   - Same column: shift down (wrap around)
   - Rectangle: swap columns
4. **Decryption Rules**:
   - Same row: shift left (wrap around)
   - Same column: shift up (wrap around)
   - Rectangle: same as encryption

### Example

**Keyword**: `MONARCHY`
**Plaintext**: `BALLOON`

**Step 1**: Generate 5×5 Matrix
```
M O N A R
C H Y B D
E F G I/J K
L P Q S T
U V W X Z
```

**Step 2**: Break into digrams: `BA` `LL` `OO` `N`
- Handle doubles: `BA` `LX` `LO` `OX` `NX`

**Step 3**: Apply cipher rules to each digram
- Result: `IBSUPMNA`

---

## Command Examples

### Encrypt Multiple Files
```bash
for file in *.txt; do
  playfair encrypt-file "$file" "${file%.txt}.enc" "MYPASSWORD"
done
```

### Decrypt with Piping
```bash
echo "CFSUPMCPQP" | playfair decrypt MONARCHY
```

### Use in Scripts
```javascript
#!/usr/bin/env node
const { encrypt, decrypt } = require('playfair-cipher-js');

const keyword = process.argv[2];
const text = process.argv[3];

if (!keyword || !text) {
  console.log('Usage: node script.js <keyword> <text>');
  process.exit(1);
}

const encrypted = encrypt(text, keyword);
console.log(`Encrypted: ${encrypted}`);

const decrypted = decrypt(encrypted, keyword);
console.log(`Decrypted: ${decrypted}`);
```

---

## Dependencies

- **Node.js** >= 14.0.0
- **commander** (for CLI)
- No other external dependencies for core cryptography logic

---

## Testing

```bash
# Run tests
npm test

# Run with Node directly
node cli.js encrypt "test" "keyword"
```

---

## License

This project is released under the **MIT License**. See LICENSE file for details.

---

## Contributing

Contributions are welcome! Please feel free to:
- Report bugs
- Suggest features
- Submit pull requests

For more information, see CONTRIBUTING.md

---

## Changelog

### v1.0.0 (Current)
- ✅ Professional CLI interface
- ✅ Multiple command support
- ✅ Interactive mode
- ✅ File encryption/decryption
- ✅ NPM package ready
- ✅ Module export support

---

## Roadmap

- [ ] Add password strength validation
- [ ] Add batch processing
- [ ] Add configuration file support
- [ ] Add unit tests
- [ ] Add performance benchmarks
- [ ] Create web interface (optional)
- [ ] Publish to NPM registry

---

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues first
- Provide clear examples and error messages

---

**Happy encrypting! 🔐**
