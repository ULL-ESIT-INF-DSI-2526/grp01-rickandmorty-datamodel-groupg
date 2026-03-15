import { describe, test, expect } from "vitest";

import { Character } from "../src/models/Character.js";
import { Dimension } from "../src/models/Dimension.js";
import { Invention } from "../src/models/Invention.js";

describe("Model validation", () => {
  test("Character rejects invalid intelligence", () => {
    expect(() => {
      new Character("1", "Rick", "desc", "sp1", "C-137", "Alive", "Council", 99);
    }).toThrow();
  });

  test("Dimension rejects invalid techLevel", () => {
    expect(() => {
      new Dimension("d1", "Bad", "desc", "active", 100);
    }).toThrow();
  });

  test("Invention rejects invalid dangerLevel", () => {
    expect(() => {
      new Invention("i1", "Bad", "desc", 0);
    }).toThrow();
  });
});
