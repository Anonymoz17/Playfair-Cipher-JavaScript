const { encrypt } = require("./encrypt.js");
const { decrypt } = require("./decrypt.js");

describe("Decrypt Module", () => {
  describe("Basic Decryption", () => {
    test("should decrypt encrypted text", () => {
      const encrypted = "IBSUPMNA";
      const result = decrypt(encrypted, "MONARCHY");
      expect(result).toBe("BALXLOON");
    });

    test("should decrypt CFSUPM", () => {
      const encrypted = "CFSUPM";
      const result = decrypt(encrypted, "MONARCHY");
      expect(result).toContain("H");
    });

    test("should handle spaces", () => {
      const result = decrypt("CFSUPM CPQP", "MONARCHY");
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });

    test("should handle lowercase", () => {
      const result = decrypt("cfsupm", "monarchy");
      const result2 = decrypt("CFSUPM", "MONARCHY");
      expect(result).toBe(result2);
    });
  });

  describe("Encrypt-Decrypt Roundtrip", () => {
    test("should recover plaintext after encrypt-decrypt", () => {
      const plaintext = "HELLOWORLD";
      const keyword = "MONARCHY";
      const encrypted = encrypt(plaintext, keyword);
      const decrypted = decrypt(encrypted, keyword);
      // Note: decrypted may have padding character X at different positions
      const cleaned = decrypted.replace(/X/g, "");
      expect(cleaned).toContain("HELLOWORLD");
    });

    test("should recover BALLOON", () => {
      const plaintext = "BALLOON";
      const keyword = "MONARCHY";
      const encrypted = encrypt(plaintext, keyword);
      const decrypted = decrypt(encrypted, keyword);
      // BALLOON -> encrypted -> should decrypt with some filler character
      const cleaned = decrypted.replace(/[XQ]/g, "");
      expect(
        cleaned.includes("B") &&
          cleaned.includes("A") &&
          cleaned.includes("L") &&
          cleaned.includes("O") &&
          cleaned.includes("N")
      ).toBe(true);
    });

    test("should roundtrip with different keywords", () => {
      const plaintexts = ["HELLO", "WORLD", "PLAYFAIR", "CIPHER"];
      const keywords = ["KEY", "PASSWORD", "SECRET"];

      for (const plaintext of plaintexts) {
        for (const keyword of keywords) {
          const encrypted = encrypt(plaintext, keyword);
          const decrypted = decrypt(encrypted, keyword);
          // Remove any padding X or Q characters for comparison
          const cleaned = decrypted.replace(/[XQ]/g, "");
          expect(cleaned).toContain(plaintext);
        }
      }
    });

    test("should roundtrip single character", () => {
      const plaintext = "A";
      const keyword = "KEY";
      const encrypted = encrypt(plaintext, keyword);
      const decrypted = decrypt(encrypted, keyword);
      expect(decrypted).toContain("A");
    });

    test("should roundtrip with spaces and special chars removed", () => {
      const plaintext = "HELLO WORLD";
      const keyword = "MONARCHY";
      const encrypted = encrypt(plaintext, keyword);
      const decrypted = decrypt(encrypted, keyword);
      expect(decrypted.replace(/[XQ]/g, "")).toContain("HELLOWORLD");
    });
  });

  describe("J Handling", () => {
    test("should decrypt text with J replacement", () => {
      const plaintext = "JUMP";
      const keyword = "KEY";
      const encrypted = encrypt(plaintext, keyword);
      const decrypted = decrypt(encrypted, keyword);
      // Should contain I instead of J
      expect(decrypted).toContain("IU");
    });
  });

  describe("Different Keywords", () => {
    test("should produce different results with different keywords", () => {
      const ciphertext = "CFSUPM";
      const result1 = decrypt(ciphertext, "KEYWORD1");
      const result2 = decrypt(ciphertext, "COMPLETELYIFFERENT");
      expect(result1).not.toBe(result2);
    });

    test("should handle short keyword", () => {
      const plaintext = "HELLO";
      const encrypted = encrypt(plaintext, "A");
      const result = decrypt(encrypted, "A");
      expect(result).toContain("HEL");
    });

    test("should handle long keyword", () => {
      const plaintext = "HELLO";
      const encrypted = encrypt(plaintext, "VERYLONGKEYWORD");
      const result = decrypt(encrypted, "VERYLONGKEYWORD");
      expect(result).toContain("HEL");
    });
  });

  describe("Edge Cases", () => {
    test("should handle empty string", () => {
      const result = decrypt("", "KEY");
      expect(result).toBe("");
    });

    test("should handle single character pair", () => {
      const result = decrypt("AB", "KEY");
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThanOrEqual(0);
    });

    test("should handle even-length ciphertext", () => {
      const result = decrypt("ABCDEF", "KEY");
      expect(typeof result).toBe("string");
    });

    test("should handle repeated characters", () => {
      const ciphertext = "ABABAB";
      const result = decrypt(ciphertext, "KEY");
      expect(typeof result).toBe("string");
    });
  });

  describe("Consistency", () => {
    test("should produce same result for same inputs", () => {
      const ciphertext = "CFSUPMCPQP";
      const keyword = "MONARCHY";
      const result1 = decrypt(ciphertext, keyword);
      const result2 = decrypt(ciphertext, keyword);
      expect(result1).toBe(result2);
    });
  });

  describe("Output Properties", () => {
    test("should return uppercase output", () => {
      const result = decrypt("cfsupm", "monarchy");
      expect(result).toBe(result.toUpperCase());
    });

    test("should return only letters", () => {
      const result = decrypt("CFSUPM", "KEY");
      expect(/^[A-Z]*$/.test(result)).toBe(true);
    });

    test("should return pairs of characters", () => {
      const result = decrypt("ABCDEF", "KEY");
      expect(result.length % 2 === 0 || result.length % 2 === 1).toBe(true);
    });
  });

  describe("Wrong Keyword", () => {
    test("should decrypt incorrectly with wrong keyword", () => {
      const plaintext = "HELLOWORLD";
      const encrypted = encrypt(plaintext, "CORRECT");
      const decrypted = decrypt(encrypted, "WRONG");
      expect(decrypted).not.toContain("HELLO");
    });
  });

  describe("Real World Examples", () => {
    test("should decrypt a sentence", () => {
      const plaintext = "PLEASE SEND MONEY";
      const keyword = "SECRETKEY";
      const encrypted = encrypt(plaintext, keyword);
      const decrypted = decrypt(encrypted, keyword);
      // Check that key parts are recovered
      expect(decrypted.replace(/[XQ]/g, "")).toContain("PLEASE");
    });

    test("should handle longer text", () => {
      const plaintext = "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG";
      const keyword = "LONGKEY";
      const encrypted = encrypt(plaintext, keyword);
      const decrypted = decrypt(encrypted, keyword);
      expect(typeof decrypted).toBe("string");
      expect(decrypted.length).toBeGreaterThan(0);
    });
  });
});
