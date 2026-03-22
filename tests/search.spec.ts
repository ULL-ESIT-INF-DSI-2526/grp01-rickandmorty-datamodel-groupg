import { describe, test, expect, beforeEach, afterAll } from "vitest";
import { DbManager } from "../src/database/DbManager.js";
import { SearchEngine } from "../src/services/SearchEngine.js";
import { Character } from "../src/models/Character.js";
import { Location } from "../src/models/Location.js";
import { Invention } from "../src/models/Invention.js";
import fs from "fs";

describe("SearchEngine Full Coverage Tests", () => {
  const testDbPath = "/tmp/test-db.json";
  let db: DbManager;
  let searchEngine: SearchEngine;

  beforeEach(async () => {
    db = new DbManager(testDbPath);
    searchEngine = new SearchEngine(db);

    db.characters.add(
      new Character("c1", "Rick", "Desc", "s1", "d1", "d2", "Alive", "Council", 10),
    );
    db.characters.add(
      new Character("c2", "Morty", "Desc", "s1", "d1", "d3", "Alive", "Family", 5),
    );
    db.characters.add(
      new Character("c3", "Morty Clone", "Desc", "s2", "d2", "d4", "Dead", "None", 5),
    );

    db.locations.add(new Location("l1", "Earth", "Desc", "Planet", "d1", 7000));
    db.locations.add(
      new Location("l2", "Citadel", "Desc", "Station", "d2", 1000),
    );

    db.inventions.add(
      new Invention("i1", "Portal Gun", "Desc", "c1", "Tool", 9),
    );
    db.inventions.add(
      new Invention("i2", "Neutrino Bomb", "Desc", "c1", "Weapon", 10),
    );
  });

  afterAll(() => {
    if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);
  });

  describe("searchCharacters Coverage", () => {
    test("Should hit all character filter branches", () => {
      // Individual tests to ensure each 'if' branch is executed
      expect(searchEngine.searchCharacters({ name: "Rick" })).toHaveLength(1);
      expect(searchEngine.searchCharacters({ speciesId: "s1" })).toHaveLength(
        2,
      );
      expect(
        searchEngine.searchCharacters({ affiliation: "Council" }),
      ).toHaveLength(1);
      expect(searchEngine.searchCharacters({ status: "Dead" })).toHaveLength(1);
      expect(searchEngine.searchCharacters({ originId: "d2" })).toHaveLength(1);
    });

    test("Should hit sorting tie branch (valA === valB)", () => {
      const results = searchEngine.searchCharacters({}, "intelligence", false);
      // Morty (5) and Morty Clone (5) are tied.
      // We check that the sort function handles the tie without crashing.
      expect(results).toBeDefined();
    });

    test("Should sort by name descending", () => {
      const results = searchEngine.searchCharacters({}, "name", true);
      expect(results[0].name).toBe("Rick");
    });
  });

  describe("searchLocations Coverage", () => {
    test("Should hit all location filter branches", () => {
      expect(searchEngine.searchLocations("Earth")).toHaveLength(1);
      expect(searchEngine.searchLocations(undefined, "Station")).toHaveLength(
        1,
      );
      expect(
        searchEngine.searchLocations(undefined, undefined, "d2"),
      ).toHaveLength(1);
      expect(
        searchEngine.searchLocations("NonExistent", "None", "None"),
      ).toHaveLength(0);
    });
  });

  describe("searchInventions Coverage", () => {
    test("Should hit all invention filter branches", () => {
      expect(searchEngine.searchInventions("Portal")).toHaveLength(1);
      expect(searchEngine.searchInventions(undefined, "Weapon")).toHaveLength(
        1,
      );
      expect(
        searchEngine.searchInventions(undefined, undefined, "c1"),
      ).toHaveLength(2);
      expect(
        searchEngine.searchInventions(undefined, undefined, undefined, 10),
      ).toHaveLength(1);
    });
  });

  describe("findAlternativeVersions", () => {
    test("Should find versions ignoring case", () => {
      expect(searchEngine.findAlternativeVersions("RICK")).toHaveLength(1);
    });
  });
});
