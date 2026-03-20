import { describe, test, expect } from "vitest";
import { DbManager } from "../src/database/DbManager.js";
import { MultiverseManager } from "../src/services/MultiverseManager.js";
import { Character } from "../src/models/Character.js";
import { Dimension } from "../src/models/Dimension.js";
import { Invention } from "../src/models/Invention.js";

describe("Events", () => {

  test("Register travel updates current dimension and history", async () => {
    const db = new DbManager();
    const manager = new MultiverseManager(db);

    const dim1 = new Dimension("d1", "A", "", "Active", 5);
    const dim2 = new Dimension("d2", "B", "", "Active", 6);

    db.dimensions.add(dim1);
    db.dimensions.add(dim2);

    const char = new Character("c1", "Rick", "", "sp1", "d1", "d1", "Alive", "None", 10);
    db.characters.add(char);

    await manager.registerTravel("c1", "d2", "test");

    const updated = db.characters.getById("c1");

    expect(updated?.currentDimensionId).toBe("d2");

    const history = manager.getCharacterHistory("c1");
    expect(history.length).toBeGreaterThan(0);
  });


  test("Destroy dimension changes status if empty", async () => {
    const db = new DbManager();
    const manager = new MultiverseManager(db);

    const dim = new Dimension("d1", "A", "", "Active", 5);
    db.dimensions.add(dim);

    await manager.updateDimensionState("d1", "Destroyed", "test");

    const updated = db.dimensions.getById("d1");

    expect(updated?.status).toBe("Destroyed");
  });


  test("Cannot destroy dimension with characters inside", async () => {
    const db = new DbManager();
    const manager = new MultiverseManager(db);

    const dim = new Dimension("d1", "A", "", "Active", 5);
    db.dimensions.add(dim);

    const char = new Character("c1", "Rick", "", "sp1", "d1", "d1", "Alive", "None", 10);
    db.characters.add(char);

    await expect(
      manager.updateDimensionState("d1", "Destroyed", "test")
    ).rejects.toThrow();
  });

});


describe("Reports", () => {

  test("Get smartest characters returns ordered list", () => {
    const db = new DbManager();
    const manager = new MultiverseManager(db);

    db.characters.add(new Character("1", "A", "", "sp1", "d1", "d1", "Alive", "None", 5));
    db.characters.add(new Character("2", "B", "", "sp1", "d1", "d1", "Alive", "None", 10));

    const result = manager.getSmartestCharacters();

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].intelligence).toBeGreaterThanOrEqual(result[1].intelligence);
  });


  test("Get dangerous dimensions returns ordered list", () => {
    const db = new DbManager();
    const manager = new MultiverseManager(db);

    db.dimensions.add(new Dimension("1", "A", "", "Active", 5));
    db.dimensions.add(new Dimension("2", "B", "", "Active", 10));

    const result = manager.getDangerousDimensions();

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].techLevel).toBeGreaterThanOrEqual(result[1].techLevel);
  });


  test("Get danger report returns inventions ordered by danger", () => {
    const db = new DbManager();
    const manager = new MultiverseManager(db);

    db.inventions.add(new Invention("1", "A", "", "c1", "Tool", 5));
    db.inventions.add(new Invention("2", "B", "", "c1", "Tool", 10));

    const result = manager.getDangerReport();

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].dangerLevel).toBeGreaterThanOrEqual(result[1].dangerLevel);
  });


  test("Get character history returns events", async () => {
    const db = new DbManager();
    const manager = new MultiverseManager(db);

    const dim1 = new Dimension("d1", "A", "", "Active", 5);
    const dim2 = new Dimension("d2", "B", "", "Active", 6);

    db.dimensions.add(dim1);
    db.dimensions.add(dim2);

    const char = new Character("c1", "Rick", "", "sp1", "d1", "d1", "Alive", "None", 10);
    db.characters.add(char);

    await manager.registerTravel("c1", "d2", "test");

    const history = manager.getCharacterHistory("c1");

    expect(history.length).toBeGreaterThan(0);
    expect(history[0].subjectId).toBe("c1");
  });


  test("Combined report returns data", () => {
    const db = new DbManager();
    const manager = new MultiverseManager(db);

    db.characters.add(new Character("1", "A", "", "sp1", "d1", "d1", "Alive", "None", 10));
    db.dimensions.add(new Dimension("1", "A", "", "Active", 10));

    const result = manager.getCombinedReport();

    expect(result.smartestCharacter).toBeDefined();
    expect(result.mostAdvancedDimension).toBeDefined();
  });

});