const { encrypt } = require("./encrypt.js");

describe("Encrypt Module", () => {
  describe("Basic Encryption", () => {
    test("should encrypt simple text", () => {
      const result = encrypt("BALLOON", "MONARCHY");
      expect(result).toBe("IBSUPMNA");
    });

    test("should encrypt HELLO", () => {
      const result = encrypt("HELLO", "MONARCHY");
      expect(result).toBe("CFSUPM");
    });

    test("should handle spaces", () => {
      const result = encrypt("HELLO WORLD", "MONARCHY");
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });

    test("should handle lowercase", () => {
      const result = encrypt("hello", "monarchy");
      expect(typeof result).toBe("string");
      // Should be treated same as uppercase
      const result2 = encrypt("HELLO", "MONARCHY");
      expect(result).toBe(result2);
    });

    test("should handle mixed case", () => {
      const result = encrypt("HeLLo", "MoNaRcHy");
      const expected = encrypt("HELLO", "MONARCHY");
      expect(result).toBe(expected);
    });
  });

  describe("Special Characters and Numbers", () => {
    test("should ignore numbers", () => {
      const result1 = encrypt("HELLO123", "KEY");
      const result2 = encrypt("HELLO", "KEY");
      expect(result1).toBe(result2);
    });

    test("should ignore special characters", () => {
      const result1 = encrypt("HELLO!@#$", "KEY");
      const result2 = encrypt("HELLO", "KEY");
      expect(result1).toBe(result2);
    });

    test("should ignore punctuation", () => {
      const result1 = encrypt("HELLO, WORLD!", "KEY");
      const result2 = encrypt("HELLOWORLD", "KEY");
      expect(result1).toBe(result2);
    });
  });

  describe("J Replacement", () => {
    test("should replace J with I", () => {
      const result1 = encrypt("JUMP", "KEY");
      const result2 = encrypt("IUMP", "KEY");
      expect(result1).toBe(result2);
    });

    test("should handle text with J", () => {
      const result = encrypt("JJJJJ", "KEY");
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("Different Keywords", () => {
    test("should produce different results with different keywords", () => {
      const text = "HELLO";
      const result1 = encrypt(text, "KEYWORD1");
      const result2 = encrypt(text, "COMPLETELYIFFERENT");
      expect(result1).not.toBe(result2);
    });

    test("should handle short keyword", () => {
      const result = encrypt("HELLO", "A");
      expect(typeof result).toBe("string");
    });

    test("should handle long keyword", () => {
      const result = encrypt("HELLO", "VERYLONGKEYWORDPHRASE");
      expect(typeof result).toBe("string");
    });

    test("should handle numeric keyword", () => {
      const result = encrypt("HELLO", "12345");
      expect(typeof result).toBe("string");
    });
  });

  describe("Edge Cases", () => {
    test("should handle empty string", () => {
      const result = encrypt("", "KEY");
      expect(result).toBe("");
    });

    test("should handle single character", () => {
      const result = encrypt("A", "KEY");
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    test("should handle odd-length plaintext", () => {
      const result = encrypt("ABC", "KEY");
      expect(typeof result).toBe("string");
      expect(result.length % 2).toBe(0); // Result should be even length
    });

    test("should handle same character repeated", () => {
      const result = encrypt("AAAA", "KEY");
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });

    test("should handle all same characters with filler", () => {
      const result = encrypt("XXXXXXXXXXX", "KEY");
      expect(typeof result).toBe("string");
    });
  });

  describe("Consistency", () => {
    test("should produce same result for same inputs", () => {
      const text = "HELLOWORLD";
      const keyword = "SECRETKEY";
      const result1 = encrypt(text, keyword);
      const result2 = encrypt(text, keyword);
      expect(result1).toBe(result2);
    });

    test("should produce different lengths for different plaintexts", () => {
      const result1 = encrypt("A", "KEY");
      const result2 = encrypt("AAAA", "KEY");
      expect(result1.length).not.toBe(result2.length);
    });
  });

  describe("Output Properties", () => {
    test("should return uppercase output", () => {
      const result = encrypt("hello world", "key");
      expect(result).toBe(result.toUpperCase());
    });

    test("should return only letters", () => {
      const result = encrypt("HELLO WORLD 123", "KEY");
      expect(/^[A-Z]*$/.test(result)).toBe(true);
    });

    test("should always return even length for even input", () => {
      const result = encrypt("HELLOWORLD", "KEY"); // 10 chars
      expect(result.length % 2).toBe(0);
    });

    test("should return even length for odd input (with padding)", () => {
      const result = encrypt("HELLO", "KEY"); // 5 chars -> padded to 6
      expect(result.length % 2).toBe(0);
    });
  });

  describe("Real World Examples", () => {
    test("should encrypt a sentence", () => {
      const result = encrypt("PLEASE SEND MONEY", "SECRETKEY");
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });

    test("should handle different sentence", () => {
      const result = encrypt("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG", "KEY");
      expect(typeof result).toBe("string");
    });
  });
});
