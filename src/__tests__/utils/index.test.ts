import { describe, it, expect } from "vitest";
import { chunkArray, roundDecimals } from "@/utils";

describe("chunkArray", () => {
  it("should split array into chunks of given size", () => {
    const input = [1, 2, 3, 4, 5];
    const result = chunkArray(input, 2);
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("should return the same array when size is greater than array length", () => {
    const input = [1, 2];
    const result = chunkArray(input, 5);
    expect(result).toEqual([[1, 2]]);
  });

  it("should return an empty array when input is empty", () => {
    const result = chunkArray([], 3);
    expect(result).toEqual([]);
  });
});

describe("roundDecimals", () => {
  it("should round to 2 decimal places by default", () => {
    expect(roundDecimals(3.14159)).toBe(3.14);
  });

  it("should round to specified number of decimal places", () => {
    expect(roundDecimals(3.14159, 3)).toBe(3.142);
  });

  it("should return integer if no decimals", () => {
    expect(roundDecimals(10.5, 0)).toBe(11);
  });
});
