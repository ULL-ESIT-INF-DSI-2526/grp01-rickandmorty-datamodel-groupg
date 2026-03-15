import { describe, test, expect } from "vitest";
import { DbManager } from "../src/database/DbManager.js";

import { Character } from "../src/models/Character.js";
import { Dimension } from "../src/models/Dimension.js";

import fs from "fs";

describe("DbManager", () => {
  const testFile = "./data/test-db.json";

  // Clean test file before each run
  if (fs.existsSync(testFile)) fs.unlinkSync(testFile);

  test("DbManager saves and loads data correctly", async () => {
    const db = new DbManager(testFile);

    db.characters.add(
      new Character("1", "Rick", "Scientist", "sp1", "C-137", "Alive", "Council", 10)
    );

    db.dimensions.add(
      new Dimension("d1", "C-137", "Main", "active", 8)
    );

    await db.save();

    const db2 = new DbManager(testFile);
    await db2.load();

    expect(db2.characters.getById("1")?.name).toBe("Rick");
    expect(db2.dimensions.getById("d1")?.techLevel).toBe(8);
  });
});
