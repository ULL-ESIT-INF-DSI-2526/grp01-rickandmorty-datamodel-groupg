import { describe, test, expect, beforeEach } from "vitest";
import { DbManager } from "../src/database/DbManager.js";
import { SearchEngine } from "../src/services/SearchEngine.js";
import { Character } from "../src/models/Character.js";

describe("SearchEngine Logic", () => {
  let db: DbManager;
  let searchEngine: SearchEngine;

  beforeEach(() => {
    db = new DbManager("./data/test-search.json");
    searchEngine = new SearchEngine(db);
    
    // Mock data
    db.characters.add(new Character("1", "Rick C-137", "Original", "s1", "d1", "Alive", "None", 10));
    db.characters.add(new Character("2", "Evil Rick", "Villain", "s1", "d2", "Dead", "None", 9));
  });

  test("Should find alternative versions of a character", () => {
    const results = searchEngine.findAlternativeVersions("Rick");
    expect(results.length).toBe(2);
  });

  test("Should sort characters by intelligence descending", () => {
    const results = searchEngine.sortCharacters("intelligence", true);
    expect(results[0].name).toBe("Rick C-137");
  });
});