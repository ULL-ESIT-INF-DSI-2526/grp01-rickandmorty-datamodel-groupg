/**
 * Tests for model constructors.
 * Since validation is NOT performed in constructors,
 * these tests simply ensure objects are created correctly.
 */

import { describe, test, expect } from "vitest";

import { Character } from "../src/models/Character.js";
import { Dimension } from "../src/models/Dimension.js";
import { Species } from "../src/models/Species.js";
import { Location } from "../src/models/Location.js";
import { Invention } from "../src/models/Invention.js";

describe("Model construction", () => {
  test("Character constructs without validation", () => {
    const c = new Character("1", "Rick", "desc", "sp1", "C-137", "Alive", "Council", 99);
    expect(c.intelligence).toBe(99);
  });

  test("Dimension constructs without validation", () => {
    const d = new Dimension("d1", "C-137", "desc", "Active", 0);
    expect(d.techLevel).toBe(0);
  });

  test("Species constructs without validation", () => {
    const s = new Species("s1", "Human", "desc", "Earth", "Humanoid", -10);
    expect(s.averageLifespan).toBe(-10);
  });

  test("Location constructs without validation", () => {
    const l = new Location("l1", "Earth", "desc", "Planet", "C-137", -5);
    expect(l.population).toBe(-5);
  });

  test("Invention constructs without validation", () => {
    const i = new Invention("i1", "Portal Gun", "desc", "rick1", "Device", 0);
    expect(i.dangerLevel).toBe(0);
  });
});
