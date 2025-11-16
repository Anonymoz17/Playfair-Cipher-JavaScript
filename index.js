/**
 * Playfair Cipher JS
 * A professional Node.js implementation of the Playfair cipher
 *
 * @module playfair-cipher-js
 */

const { encrypt } = require("./src/encrypt.js");
const { decrypt } = require("./src/decrypt.js");
const { create5x5Matrix, dissectText, findPosition } = require("./src/helpers.js");

/**
 * Main API object for Playfair Cipher
 */
const PlayfairCipher = {
  /**
   * Encrypt plaintext using Playfair cipher
   * @param {string} plaintext - The text to encrypt
   * @param {string} keyword - The keyword for matrix generation
   * @returns {string} Encrypted text
   */
  encrypt,

  /**
   * Decrypt ciphertext using Playfair cipher
   * @param {string} ciphertext - The text to decrypt
   * @param {string} keyword - The keyword for matrix generation
   * @returns {string} Decrypted text
   */
  decrypt,

  /**
   * Create a 5x5 matrix from a keyword
   * @param {string} keyword - The keyword for matrix generation
   * @returns {Array<Array<string>>} 5x5 matrix
   */
  create5x5Matrix,

  /**
   * Dissect text into chunks of given interval
   * @param {string} text - The text to dissect
   * @param {number} interval - Chunk size
   * @returns {Array<Array<string>>} Array of text chunks
   */
  dissectText,

  /**
   * Find position of a character in the matrix
   * @param {Array<Array<string>>} matrix - The 5x5 matrix
   * @param {string} char - Character to find
   * @returns {Array<number>} [row, column] or null
   */
  findPosition,
};

// Support both CommonJS and ES Module exports
module.exports = PlayfairCipher;
module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
module.exports.create5x5Matrix = create5x5Matrix;
module.exports.dissectText = dissectText;
module.exports.findPosition = findPosition;
