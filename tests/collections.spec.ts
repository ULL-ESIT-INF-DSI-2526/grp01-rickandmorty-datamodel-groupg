/**
 * Tests for all collection classes.
 * Ensures filtering and sorting methods work correctly.
 */

import { describe, test, expect } from "vitest";

import { Character } from "../src/models/Character.js";
import { CharacterColl } from "../src/collections/CharacterColl.js";

import { Dimension } from "../src/models/Dimension.js";
import { DimensionColl } from "../src/collections/DimensionColl.js";

import { Species } from "../src/models/Species.js";
import { SpeciesColl } from "../src/collections/SpeciesColl.js";

import { Location } from "../src/models/Location.js";
import { LocationColl } from "../src/collections/LocationColl.js";

import { Invention } from "../src/models/Invention.js";
import { InventionColl } from "../src/collections/InventionColl.js";

describe("Collections", () => {
  test("CharacterColl basic operations", () => {
    const coll = new CharacterColl();

    const rick = new Character(
      "1", "Rick", "Scientist", "sp1", "C-137", "Alive", "Council", 10
    );

    coll.add(rick);

    expect(coll.getById("1")).toBeDefined();
    expect(coll.findBySpecies("sp1").length).toBe(1);
    expect(coll.orderByIntelligence(true)[0].name).toBe("Rick");

    coll.remove("1");
    expect(coll.getById("1")).toBeUndefined();
  });

  test("DimensionColl filtering", () => {
    const coll = new DimensionColl();

    coll.add(new Dimension("d1", "C-137", "Main", "Active", 8));
    coll.add(new Dimension("d2", "Apocalypse", "Dead world", "Destroyed", 2));

    expect(coll.findByStatus("Active").length).toBe(1);
    expect(coll.findByTechLevel(8)[0].id).toBe("d1");
  });

  test("SpeciesColl filtering", () => {
    const coll = new SpeciesColl();

    coll.add(new Species("s1", "Human", "desc", "Earth", "Humanoid", 80));
    coll.add(new Species("s2", "Gromflomite", "desc", "Gromflom", "Insectoid", 40));

    expect(coll.findByType("Humanoid").length).toBe(1);
    expect(coll.findByOrigin("Earth")[0].id).toBe("s1");
  });

  test("LocationColl filtering", () => {
    const coll = new LocationColl();

    coll.add(new Location("l1", "Citadel", "desc", "Station", "C-137", 1000000));
    coll.add(new Location("l2", "Earth", "desc", "Planet", "C-137", 7000000000));

    expect(coll.findByDimension("C-137").length).toBe(2);
    expect(coll.findByType("Planet")[0].id).toBe("l2");
  });

  test("InventionColl danger sorting", () => {
    const coll = new InventionColl();

    coll.add(new Invention("i1", "Portal Gun", "desc", "rick1", "Device", 9));
    coll.add(new Invention("i2", "Butter Robot", "desc", "rick1", "Robot", 1));

    const sorted = coll.orderByDanger(true);
    expect(sorted[0].id).toBe("i1");
  });
});
