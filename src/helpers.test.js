const { create5x5Matrix, dissectText, findPosition } = require("./helpers.js");

describe("Helpers Module", () => {
  describe("create5x5Matrix", () => {
    test("should create a 5x5 matrix", () => {
      const matrix = create5x5Matrix("MONARCHY");
      expect(matrix.length).toBe(5);
      expect(matrix[0].length).toBe(5);
    });

    test("should have 25 unique characters", () => {
      const matrix = create5x5Matrix("MONARCHY");
      const chars = new Set();
      for (const row of matrix) {
        for (const char of row) {
          chars.add(char);
        }
      }
      expect(chars.size).toBe(25);
    });

    test("should start with keyword letters", () => {
      const matrix = create5x5Matrix("MONARCHY");
      expect(matrix[0][0]).toBe("M");
      expect(matrix[0][1]).toBe("O");
      expect(matrix[0][2]).toBe("N");
      expect(matrix[0][3]).toBe("A");
      expect(matrix[0][4]).toBe("R");
    });

    test("should replace J with I", () => {
      const matrix = create5x5Matrix("JUSTKEY");
      const chars = new Set();
      for (const row of matrix) {
        for (const char of row) {
          chars.add(char);
        }
      }
      expect(chars.has("J")).toBe(false);
      expect(chars.has("I")).toBe(true);
    });

    test("should handle empty keyword", () => {
      const matrix = create5x5Matrix("");
      expect(matrix.length).toBe(5);
      expect(matrix[0][0]).toBe("A");
    });

    test("should handle special characters in keyword", () => {
      const matrix = create5x5Matrix("KEY123!@#");
      expect(matrix.length).toBe(5);
      expect(matrix[0].length).toBe(5);
    });

    test("should remove duplicate characters from keyword", () => {
      const matrix1 = create5x5Matrix("AAABBBCCC");
      expect(matrix1[0][0]).toBe("A");
      expect(matrix1[0][1]).toBe("B");
      expect(matrix1[0][2]).toBe("C");
    });
  });

  describe("dissectText", () => {
    test("should split text into pairs", () => {
      const result = dissectText("HELLOWORLD", 2);
      expect(result.length).toBe(5);
      expect(result[0]).toEqual(["H", "E"]);
      expect(result[1]).toEqual(["L", "L"]);
    });

    test("should handle odd-length text", () => {
      const result = dissectText("HELLO", 2);
      expect(result.length).toBe(3);
      expect(result[2]).toEqual(["O"]);
    });

    test("should split text into custom intervals", () => {
      const result = dissectText("ABCDEFGHIJ", 3);
      expect(result.length).toBe(4);
      expect(result[0]).toEqual(["A", "B", "C"]);
      expect(result[1]).toEqual(["D", "E", "F"]);
      expect(result[3]).toEqual(["J"]);
    });

    test("should remove spaces", () => {
      const result = dissectText("HE LLO WO RLD", 2);
      expect(result[0]).toEqual(["H", "E"]);
      expect(result[1]).toEqual(["L", "L"]);
    });

    test("should handle empty string", () => {
      const result = dissectText("", 2);
      expect(result.length).toBe(0);
    });

    test("should handle single character", () => {
      const result = dissectText("A", 2);
      expect(result.length).toBe(1);
      expect(result[0]).toEqual(["A"]);
    });
  });

  describe("findPosition", () => {
    let matrix;

    beforeEach(() => {
      matrix = create5x5Matrix("MONARCHY");
    });

    test("should find position of character", () => {
      const pos = findPosition(matrix, "M");
      expect(pos).toEqual([0, 0]);
    });

    test("should find position in middle of matrix", () => {
      const pos = findPosition(matrix, "H");
      expect(pos).toEqual([1, 1]);
    });

    test("should find position at end of matrix", () => {
      const pos = findPosition(matrix, "Z");
      expect(pos[0]).toBeGreaterThanOrEqual(0);
      expect(pos[0]).toBeLessThan(5);
      expect(pos[1]).toBeGreaterThanOrEqual(0);
      expect(pos[1]).toBeLessThan(5);
    });

    test("should return null for non-existent character", () => {
      const pos = findPosition(matrix, "J");
      expect(pos).toBeNull();
    });

    test("should handle lowercase characters", () => {
      const pos = findPosition(matrix, "m");
      // findPosition works with uppercase in the matrix
      // So lowercase won't be found
      expect(pos).toBeNull();
    });

    test("should find all alphabet characters except J", () => {
      const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; /* Note: no J */
      for (const char of alphabet) {
        const pos = findPosition(matrix, char);
        expect(pos).not.toBeNull();
        expect(Array.isArray(pos)).toBe(true);
        expect(pos.length).toBe(2);
      }
    });
  });
});
