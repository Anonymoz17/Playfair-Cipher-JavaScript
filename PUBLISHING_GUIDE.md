# NPM Publishing Guide

This guide will help you publish your **playfair-cipher-js** package to NPM.

---

## Prerequisites

1. **Node.js & npm** installed (you already have this ✅)
2. **GitHub account** (recommended for repository link)
3. **NPM account** (you'll need to create one)

---

## Step 1: Create NPM Account

If you don't have an npm account yet:

### Option A: Online Registration
Visit https://www.npmjs.com/signup and create your account

### Option B: Command Line
```bash
npm adduser
```

This will prompt you for:
- Username
- Password
- Email

---

## Step 2: Update package.json

Before publishing, update these fields with YOUR information:

```bash
# Update your name
npm config set init-author-name "Your Name"
npm config set init-author-email "your.email@example.com"
npm config set init-author-url "https://yourwebsite.com"
```

Or manually edit `package.json`:

```json
{
  "author": "Your Name <your.email@example.com> (https://yourwebsite.com)",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/playfair-cipher-js.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/playfair-cipher-js/issues"
  },
  "homepage": "https://github.com/yourusername/playfair-cipher-js#readme"
}
```

---

## Step 3: Verify Package Name

Your package name is: **playfair-cipher-js**

Check if it's already taken:
```bash
npm search playfair-cipher-js
```

Or visit: https://www.npmjs.com/package/playfair-cipher-js

If the name is taken, you can:
- Use a scoped name: `@yourname/playfair-cipher-js`
- Choose a different name

---

## Step 4: Update Version Number

For first release, keep version **1.0.0** (already set)

For future releases, follow [Semantic Versioning](https://semver.org/):
- **1.0.0** → **1.0.1** (patch: bug fixes)
- **1.0.0** → **1.1.0** (minor: new features)
- **1.0.0** → **2.0.0** (major: breaking changes)

Update in `package.json`:
```json
{
  "version": "1.0.0"
}
```

Or via command line:
```bash
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0
```

---

## Step 5: Create .npmignore

Create `.npmignore` file to exclude files from the package:

```
# Development
node_modules/
.git/
.github/
.vscode/
.idea/

# Tests
src/**/*.test.js
jest.config.js

# Build & Development
coverage/
dist/
build/

# Config
.eslintrc.json
.prettierrc
eslint.config.js
jest.config.js

# Documentation
PUBLISHING_GUIDE.md
PROJECT_WRAPPING_PLAN.md
PHASE1_SUMMARY.md

# Files
*.md
.gitignore
```

---

## Step 6: Run Final Tests

Before publishing, make sure everything works:

```bash
# Run tests
npm test

# Run linting
npm run lint

# Check code formatting
npm run format:check

# Test local installation
npm pack
# This creates a .tgz file you can test
```

---

## Step 7: Login to NPM

```bash
npm login
```

You'll be prompted for:
- Username
- Password
- Email (used to verify your account)

Verify you're logged in:
```bash
npm whoami
```

---

## Step 8: Publish to NPM

### For Public Package (No Scope):
```bash
npm publish
```

### For Scoped Package (if name was taken):
Update `package.json`:
```json
{
  "name": "@yourname/playfair-cipher-js"
}
```

Then publish:
```bash
npm publish --access public
```

---

## Step 9: Verify Publication

Check your package on NPM:
```bash
# View package info
npm view playfair-cipher-js

# Visit the package page
# https://www.npmjs.com/package/playfair-cipher-js
```

---

## Step 10: Test Installation

Install your package from NPM to verify it works:

```bash
# Create a test directory
mkdir test-playfair
cd test-playfair

# Install from npm
npm install playfair-cipher-js

# Create test.js
cat > test.js << 'EOF'
const { encrypt, decrypt } = require('playfair-cipher-js');

console.log('Testing playfair-cipher-js from NPM...');
const encrypted = encrypt('HELLO', 'MONARCHY');
console.log('Encrypted:', encrypted);

const decrypted = decrypt(encrypted, 'MONARCHY');
console.log('Decrypted:', decrypted);
EOF

# Run the test
node test.js
```

---

## Publish CLI Tool Globally

Once published, users can install globally:

```bash
npm install -g playfair-cipher-js

# Use the CLI
playfair encrypt "HELLO" "MONARCHY"
playfair --help
playfair --version
```

---

## Future Updates

### Update Version:
```bash
npm version minor  # or patch/major
```

### Publish Update:
```bash
npm publish
```

### Unpublish (if needed):
```bash
npm unpublish playfair-cipher-js@1.0.0  # specific version
npm unpublish playfair-cipher-js --force  # entire package (24hr only)
```

---

## Troubleshooting

### "npm ERR! 403 Forbidden"
- Package name already exists
- Not authorized (try `npm login` again)
- Try a different name or scoped name

### "npm ERR! 401 Unauthorized"
- Not logged in (run `npm login`)
- Credentials are wrong

### "npm ERR! No README found"
- Ensure README.md exists in root

### "npm ERR! Invalid name"
- Package name must be lowercase
- Can't have spaces
- Valid characters: a-z, 0-9, -, _

---

## Best Practices

✅ Always run tests before publishing
✅ Update version numbers properly
✅ Write meaningful commit messages
✅ Include a good README
✅ Add keywords for searchability
✅ Specify a license
✅ Keep dependencies minimal
✅ Test locally with `npm pack`
✅ Document breaking changes in CHANGELOG

---

## Useful Links

- NPM Homepage: https://www.npmjs.com/
- Publish Guide: https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry
- Semantic Versioning: https://semver.org/
- Package.json Reference: https://docs.npmjs.com/files/package.json

---

## Your Package Details

| Field | Value |
|-------|-------|
| **Name** | playfair-cipher-js |
| **Version** | 1.0.0 |
| **License** | MIT |
| **Main** | index.js |
| **CLI Command** | playfair |
| **Keywords** | cipher, encryption, cryptography |

---

## Next Steps

1. Update your GitHub repo URL in package.json
2. Create an NPM account at https://www.npmjs.com/signup
3. Follow Steps 1-9 above
4. Share your package with friends and the community!

---

**Ready to publish? Good luck! 🚀**
