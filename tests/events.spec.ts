import { describe, test, expect } from "vitest";
import { DbManager } from "../src/database/DbManager.js";
import { MultiverseManager } from "../src/services/MultiverseManager.js";
import { Character } from "../src/models/Character.js";
import { Dimension } from "../src/models/Dimension.js";

describe("Events", () => {

test("Register travel updates current dimension and history", async () => {
const db = new DbManager("data/test-db.json");
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
const db = new DbManager("data/test-db.json");
const manager = new MultiverseManager(db);

const dim = new Dimension("d1", "A", "", "Active", 5);
db.dimensions.add(dim);

await manager.updateDimensionState("d1", "Destroyed", "test");

const updated = db.dimensions.getById("d1");

expect(updated?.status).toBe("Destroyed");
});

test("Cannot destroy dimension with characters inside", async () => {
const db = new DbManager("data/test-db.json");
const manager = new MultiverseManager(db);

const dim = new Dimension("d1", "A", "", "Active", 5);
db.dimensions.add(dim);

const char = new Character("c1", "Rick", "", "sp1", "d1", "d1", "Alive", "None", 10);
db.characters.add(char);

await expect(
manager.updateDimensionState("d1", "Destroyed", "test")
).rejects.toThrow();
});

test("Throws if character does not exist", async () => {
const db = new DbManager("data/test-db.json");
const manager = new MultiverseManager(db);

db.dimensions.add(new Dimension("d1", "A", "", "Active", 5));

await expect(
manager.registerTravel("fake", "d1", "test")
).rejects.toThrow();
});

test("Throws if dimension does not exist", async () => {
const db = new DbManager("data/test-db.json");
const manager = new MultiverseManager(db);

db.characters.add(new Character("c1", "Rick", "", "sp1", "d1", "d1", "Alive", "None", 10));

await expect(
manager.registerTravel("c1", "fake", "test")
).rejects.toThrow();
});

test("Cannot travel to destroyed dimension", async () => {
const db = new DbManager("data/test-db.json");
const manager = new MultiverseManager(db);

const dim1 = new Dimension("d1", "A", "", "Active", 5);
const dim2 = new Dimension("d2", "B", "", "Destroyed", 6);

db.dimensions.add(dim1);
db.dimensions.add(dim2);

const char = new Character("c1", "Rick", "", "sp1", "d1", "d1", "Alive", "None", 10);
db.characters.add(char);

await expect(
manager.registerTravel("c1", "d2", "test")
).rejects.toThrow();
});

});