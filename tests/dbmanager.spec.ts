/**
 * Tests for DbManager using raw model constructors.
 */
import { describe, test, expect } from "vitest";
import { DbManager } from "../src/database/DbManager.js";

import { Character } from "../src/models/Character.js";
import { Dimension } from "../src/models/Dimension.js";
import { Species } from "../src/models/Species.js";
import { Location } from "../src/models/Location.js";
import { Invention } from "../src/models/Invention.js";

import fs from "fs";

describe("DbManager", () => {
  const testFile = "data/test-db.json";

  if (fs.existsSync(testFile)) fs.unlinkSync(testFile);

  test("DbManager saves and loads data correctly", async () => {
    const db = new DbManager(testFile);

    db.characters.add(
      new Character(
        "1",
        "Rick",
        "Scientist",
        "sp1",
        "C-137",
        "Alive",
        "Council",
        10,
      ),
    );

    db.dimensions.add(new Dimension("d1", "C-137", "Main", "Active", 8));

    db.species.add(new Species("s1", "Human", "desc", "Earth", "Humanoid", 80));

    db.locations.add(
      new Location("l1", "Earth", "desc", "Planet", "C-137", 7000000000),
    );

    db.inventions.add(
      new Invention("i1", "Portal Gun", "desc", "1", "Device", 9),
    );

    await db.save();

    const db2 = new DbManager(testFile);
    await db2.load();

    expect(db2.characters.getById("1")?.name).toBe("Rick");
    expect(db2.dimensions.getById("d1")?.techLevel).toBe(8);
    expect(db2.species.getById("s1")?.type).toBe("Humanoid");
    expect(db2.locations.getById("l1")?.population).toBe(7000000000);
    expect(db2.inventions.getById("i1")?.dangerLevel).toBe(9);
  });
});
