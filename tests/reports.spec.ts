import { describe, test, expect } from "vitest";
import { DbManager } from "../src/database/DbManager.js";
import { MultiverseManager } from "../src/services/MultiverseManager.js";
import { Character } from "../src/models/Character.js";
import { Dimension } from "../src/models/Dimension.js";
import { Invention } from "../src/models/Invention.js";

describe("Reports", () => {

  test("Get smartest characters returns ordered list", () => {
    
    const db = new DbManager("/tmp/test-db.json");
    const manager = new MultiverseManager(db);

    db.characters.add(
      new Character("1", "A", "", "sp1", "d1", "d1", "Alive", "None", 5),
    );
    db.characters.add(
      new Character("2", "B", "", "sp1", "d1", "d1", "Alive", "None", 10),
    );

    const result = manager.getSmartestCharacters();

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].intelligence).toBeGreaterThanOrEqual(
      result[1].intelligence,
    );
  });

  test("Get dangerous dimensions returns ordered list", () => {
    const db = new DbManager("/tmp/test-db.json");
    const manager = new MultiverseManager(db);

    db.dimensions.add(new Dimension("1", "A", "", "Active", 5));
    db.dimensions.add(new Dimension("2", "B", "", "Active", 10));

    const result = manager.getDangerousDimensions();

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].techLevel).toBeGreaterThanOrEqual(result[1].techLevel);
  });

  test("Get danger report returns inventions ordered by danger", () => {
    const db = new DbManager("/tmp/test-db.json");
    const manager = new MultiverseManager(db);

    db.inventions.add(new Invention("1", "A", "", "c1", "Tool", 7));
    db.inventions.add(new Invention("2", "B", "", "c1", "Tool", 10));

    const result = manager.getDangerReport();

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].danger).toBeGreaterThanOrEqual(result[1].danger);
  });

  test("Tech report calculates correct average", () => {
    const db = new DbManager("/tmp/test-db.json");
    const manager = new MultiverseManager(db);

    db.dimensions.add(new Dimension("1", "A", "", "Active", 5));
    db.dimensions.add(new Dimension("2", "B", "", "Active", 15));

    const report = manager.getTechReport();

    expect(report.dimensions.length).toBe(2);
    expect(report.average).toBe("10.0"); // (5 + 15) / 2
  });

  test("Get character history returns events", async () => {
    const db = new DbManager("/tmp/test-db.json");
    const manager = new MultiverseManager(db);

    const dim1 = new Dimension("d1", "A", "", "Active", 5);
    const dim2 = new Dimension("d2", "B", "", "Active", 6);

    db.dimensions.add(dim1);
    db.dimensions.add(dim2);

    const char = new Character(
      "c1",
      "Rick",
      "",
      "sp1",
      "d1",
      "d1",
      "Alive",
      "None",
      10,
    );
    db.characters.add(char);

    await manager.registerTravel("c1", "d2", "test");

    const history = manager.getCharacterHistory("c1");

    expect(history.length).toBeGreaterThan(0);
    expect(history[0].subjectId).toBe("c1");
  });

  test("Version analytics detects multiple versions", () => {
    const db = new DbManager("/tmp/test-db.json");
    const manager = new MultiverseManager(db);

    db.characters.add(
      new Character("1", "Rick", "", "sp1", "d1", "d1", "Alive", "None", 10),
    );
    db.characters.add(
      new Character(
        "2",
        "Rick Prime",
        "",
        "sp1",
        "d1",
        "d1",
        "Alive",
        "None",
        10,
      ),
    );
    db.characters.add(
      new Character("3", "Morty", "", "sp1", "d1", "d1", "Alive", "None", 10),
    );

    const result = manager.getVersionAnalytics();

    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Rick");
    expect(result[0].versions).toBe(2);
  });

  test("Danger report sets location to Unknown if inventor not found", () => {
    const db = new DbManager("/tmp/test-db.json");
    const manager = new MultiverseManager(db);

    db.inventions.add(new Invention("1", "Laser", "", "nope", "Tool", 9));

    const result = manager.getDangerReport();

    expect(result[0].location).toBe("Unknown");
  });

  test("Combined report returns data", () => {
    const db = new DbManager("/tmp/test-db.json");
    const manager = new MultiverseManager(db);

    db.characters.add(
      new Character("1", "A", "", "sp1", "d1", "d1", "Alive", "None", 10),
    );
    db.dimensions.add(new Dimension("1", "A", "", "Active", 10));

    const result = manager.getCombinedReport();

    expect(result.smartestCharacter).toBeDefined();
    expect(result.mostAdvancedDimension).toBeDefined();
  });

  test("Reports return empty when no data", () => {
    const db = new DbManager("/tmp/test-db.json");
    const manager = new MultiverseManager(db);

    expect(manager.getSmartestCharacters()).toEqual([]);
    expect(manager.getDangerousDimensions()).toEqual([]);
    expect(manager.getDangerReport()).toEqual([]);
  });

  test("Character history is empty if no events", () => {
    const db = new DbManager("/tmp/test-db.json");
    const manager = new MultiverseManager(db);

    db.characters.add(
      new Character("c1", "Rick", "", "sp1", "d1", "d1", "Alive", "None", 10),
    );

    const history = manager.getCharacterHistory("c1");

    expect(history).toEqual([]);
  });
  

  test("Handles equal intelligence values", () => {
    const db = new DbManager("/tmp/test-db.json");
    const manager = new MultiverseManager(db);

    db.characters.add(
      new Character("1", "A", "", "sp1", "d1", "d1", "Alive", "None", 5),
    );
    db.characters.add(
      new Character("2", "B", "", "sp1", "d1", "d1", "Alive", "None", 5),
    );

    const result = manager.getSmartestCharacters();

    expect(result.length).toBe(2);
  });

  
});
