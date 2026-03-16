import { describe, test, expect, beforeEach, afterAll } from "vitest";
import { DbManager } from "../src/database/DbManager.js";
import { SearchEngine } from "../src/services/SearchEngine.js";
import { Character } from "../src/models/Character.js";
import { Location } from "../src/models/Location.js";
import { Invention } from "../src/models/Invention.js";
import fs from "fs";

describe("SearchEngine Unit Tests", () => {
  const testDbPath = "data/test-search.json";
  let db: DbManager;
  let searchEngine: SearchEngine;

  /**
   * Set up a clean environment before each test.
   */
  beforeEach(async () => {
    // Ensure the data directory exists
    if (!fs.existsSync("data")) fs.mkdirSync("data");
    
    // Initialize DB and SearchEngine
    db = new DbManager(testDbPath);
    searchEngine = new SearchEngine(db);

    // Populate with Mock Data
    db.characters.add(new Character("c1", "Rick Sanchez", "Original", "s-hum", "d-137", "Alive", "Council", 10));
    db.characters.add(new Character("c2", "Morty Smith", "Sidekick", "s-hum", "d-137", "Alive", "Family", 4));
    db.characters.add(new Character("c3", "Evil Morty", "Villain", "s-hum", "d-777", "Alive", "President", 9));
    db.characters.add(new Character("c4", "Pickle Rick", "Warrior", "s-pick", "d-137", "Unknown", "None", 8));

    db.locations.add(new Location("l1", "Citadel", "Hub", "Station", "d-137", 1000000));
    db.locations.add(new Location("l2", "Earth", "Home", "Planet", "d-137", 7000000000));

    db.inventions.add(new Invention("i1", "Portal Gun", "Travel", "c1", "Device", 9));
    db.inventions.add(new Invention("i2", "Neutrino Bomb", "Weapon", "c1", "Weapon", 10));
    db.inventions.add(new Invention("i3", "Butter Robot", "Joke", "c1", "Robot", 1));
  });

  /**
   * Cleanup after tests.
   */
  afterAll(() => {
    if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);
  });

  describe("Alternative Versions Search", () => {
    test("Should find all versions of 'Rick'", () => {
      const results = searchEngine.findAlternativeVersions("Rick");
      expect(results).toHaveLength(2); // Rick Sanchez and Pickle Rick
      expect(results.some(c => c.name === "Pickle Rick")).toBe(true);
    });

    test("Should be case insensitive", () => {
      const results = searchEngine.findAlternativeVersions("morty");
      expect(results).toHaveLength(2); // Morty Smith and Evil Morty
    });

    test("Should return empty array if no match", () => {
      const results = searchEngine.findAlternativeVersions("Jerry");
      expect(results).toHaveLength(0);
    });
  });

  describe("Advanced Character Search", () => {
    test("Should filter by status 'Alive'", () => {
      const results = searchEngine.searchCharacters({ status: "Alive" });
      expect(results).toHaveLength(3);
    });

    test("Should filter by multiple criteria (Dimension + Species)", () => {
      const results = searchEngine.searchCharacters({ originId: "d-137", speciesId: "s-hum" });
      expect(results).toHaveLength(2); // Rick and Morty Smith
    });

    test("Should sort by intelligence descending", () => {
      const results = searchEngine.searchCharacters({}, "intelligence", true);
      expect(results[0].name).toBe("Rick Sanchez");
      expect(results[0].intelligence).toBe(10);
      expect(results[results.length - 1].intelligence).toBe(4);
    });

    test("Should sort by name ascending", () => {
      const results = searchEngine.searchCharacters({}, "name", false);
      expect(results[0].name).toBe("Evil Morty");
    });
  });

  describe("Location Search", () => {
    test("Should filter locations by type 'Planet'", () => {
      const results = searchEngine.searchLocations(undefined, "Planet");
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe("Earth");
    });

    test("Should filter by dimension ID", () => {
      const results = searchEngine.searchLocations(undefined, undefined, "d-137");
      expect(results).toHaveLength(2);
    });
  });

  describe("Invention Search", () => {
    test("Should find dangerous inventions (Level >= 9)", () => {
      // Inventions with exactly level 9 or 10
      const results = searchEngine.searchInventions(undefined, undefined, undefined, 9);
      const results2 = searchEngine.searchInventions(undefined, undefined, undefined, 10);
      expect(results).toHaveLength(1); // Portal Gun
      expect(results2).toHaveLength(1); // Neutrino Bomb
    });

    test("Should search invention by name", () => {
      const results = searchEngine.searchInventions("Portal");
      expect(results[0].name).toBe("Portal Gun");
    });
  });
});