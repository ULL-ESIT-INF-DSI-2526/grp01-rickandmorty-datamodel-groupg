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

    coll.add(new Dimension("d1", "C-137", "Main", "active", 8));
    coll.add(new Dimension("d2", "Apocalypse", "Dead world", "destroyed", 2));

    expect(coll.findByStatus("active").length).toBe(1);
    expect(coll.findByTechLevel(8)[0].id).toBe("d1");
  });

  test("SpeciesColl filtering", () => {
    const coll = new SpeciesColl();

    coll.add(new Species("s1", "Human", "Earth species", "Earth"));
    coll.add(new Species("s2", "Gromflomite", "Bug aliens", "Gromflom"));

    expect(coll.findByPlanet("Earth").length).toBe(1);
  });

  test("LocationColl filtering", () => {
    const coll = new LocationColl();

    coll.add(new Location("l1", "Citadel", "Central hub", "C-137"));
    coll.add(new Location("l2", "Earth", "Home", "C-137"));

    expect(coll.findByDimension("C-137").length).toBe(2);
  });

  test("InventionColl danger sorting", () => {
    const coll = new InventionColl();

    coll.add(new Invention("i1", "Portal Gun", "Travel device", 9));
    coll.add(new Invention("i2", "Butter Robot", "Makes butter", 1));

    const sorted = coll.orderByDanger(true);
    expect(sorted[0].id).toBe("i1");
  });
});
