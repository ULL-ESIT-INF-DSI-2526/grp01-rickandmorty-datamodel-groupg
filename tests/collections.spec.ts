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

import { Collection } from "../src/collections/Collection.js";

import { IEntity } from "../src/interfaces/IEntity.js";


describe("CharacterColl – full coverage", () => {
  test("findBySpecies, orderByIntelligence", () => {
    const coll = new CharacterColl();

    expect(coll.findBySpecies("none")).toEqual([]);
    expect(coll.orderByIntelligence()).toEqual([]);

    coll.add(
      new Character("1", "A", "", "sp1", "C-137", "C-137", "Alive", "Council", 5),
    );
    coll.add(new Character("2", "B", "", "sp1", "C-137", "C-137", "Dead", "Council", 1));
    coll.add(
      new Character("3", "C", "", "sp2", "D-99", "D-91",  "Alive", "Federation", 10),
    );

    expect(coll.findBySpecies("sp1").length).toBe(2);

    const sorted = coll.orderByIntelligence();
    expect(sorted[0].intelligence).toBe(1);
    expect(sorted[2].intelligence).toBe(10);
  });

  test("findByOriginDimension, findByStatus, findByAffiliation, findByCurrentDimension ", () => {
    const coll = new CharacterColl();

    coll.add(
      new Character("1", "A", "", "sp1", "C-137", "D-91", "Alive", "Council", 5),
    );
    coll.add(
      new Character("2", "B", "", "sp1", "D-99", "D-23","Dead", "Federation", 1),
    );
    coll.add(
      new Character("3", "C", "", "sp2", "C-137", "D-44", "Alive", "Council", 10),
    );

    expect(coll.findByOriginDimension("C-137").map((c) => c.id)).toEqual([
      "1",
      "3",
    ]);
    expect(coll.findByStatus("Alive").map((c) => c.id)).toEqual(["1", "3"]);
    expect(coll.findByAffiliation("Council").map((c) => c.id)).toEqual([
      "1",
      "3",
    ]);

    expect(coll.findByCurrentDimension("D-91").map((c) => c.id)).toEqual(["1"]);
    expect(coll.findByCurrentDimension("none")).toEqual([]);
  });
});


describe("DimensionColl – full coverage", () => {
  test("findByStatus, findByTechLevel, orderByTechLevel", () => {
    const coll = new DimensionColl();

    coll.add(new Dimension("1", "A", "", "Active", 5));
    coll.add(new Dimension("2", "B", "", "Active", 10));
    coll.add(new Dimension("3", "C", "", "Destroyed", 3));

    expect(coll.findByStatus("Active").length).toBe(2);
    expect(coll.findByTechLevel(10)[0].id).toBe("2");

    const ordered = coll.orderByTechLevel();
    expect(ordered.map((d) => d.techLevel)).toEqual([3, 5, 10]);
  });
});


describe("SpeciesColl – full coverage", () => {
  test("findByOrigin, findByType, orderByLifespan", () => {
    const coll = new SpeciesColl();

    coll.add(new Species("1", "A", "", "Earth", "Humanoid", 80));
    coll.add(new Species("2", "B", "", "Earth", "Insectoid", 40));
    coll.add(new Species("3", "C", "", "Mars", "Humanoid", 120));

    expect(coll.findByOrigin("Earth").length).toBe(2);
    expect(coll.findByType("Humanoid").map((s) => s.id)).toEqual(["1", "3"]);

    const ordered = coll.orderByLifespan();
    expect(ordered.map((s) => s.averageLifespan)).toEqual([40, 80, 120]);
  });
});


describe("LocationColl – full coverage", () => {
  test("findByDimension, findByType, findByMinPopulation, orderByPopulation", () => {
    const coll = new LocationColl();

    coll.add(new Location("1", "A", "", "Planet", "C-137", 100));
    coll.add(new Location("2", "B", "", "Station", "C-137", 200));
    coll.add(new Location("3", "C", "", "Planet", "D-99", 500));

    expect(coll.findByDimension("C-137").length).toBe(2);
    expect(coll.findByType("Planet").map((l) => l.id)).toEqual(["1", "3"]);
    expect(coll.findByMinPopulation(150).map((l) => l.id)).toEqual(["2", "3"]);

    const ordered = coll.orderByPopulation();
    expect(ordered.map((l) => l.population)).toEqual([100, 200, 500]);
  });
});


describe("InventionColl – full coverage", () => {
  test("findByInventor, findByType, orderByDanger", () => {
    const coll = new InventionColl();

    coll.add(new Invention("1", "A", "", "rick", "Device", 5));
    coll.add(new Invention("2", "B", "", "rick", "Robot", 10));
    coll.add(new Invention("3", "C", "", "morty", "Device", 3));

    // findByInventor
    expect(coll.findByInventor("rick").length).toBe(2);

    // findByType
    expect(coll.findByType("Device").map((i) => i.id)).toEqual(["1", "3"]);

    // orderByDanger ascending
    const asc = coll.orderByDanger(false);
    expect(asc.map((i) => i.dangerLevel)).toEqual([3, 5, 10]);

    // orderByDanger descending
    const desc = coll.orderByDanger(true);
    expect(desc.map((i) => i.dangerLevel)).toEqual([10, 5, 3]);
  });
});


describe("Collection base class – add/remove/replace", () => {
  class Dummy implements IEntity {
    constructor(
      public id: string,
      public name: string,
      public description: string,
    ) {}
  }

  class DummyColl extends Collection<Dummy> {}

  test("add throws when id exists", () => {
    const coll = new DummyColl();
    coll.add(new Dummy("1", "one", "first"));
    expect(() => coll.add(new Dummy("1", "dup", "duplicate"))).toThrow();
  });

  test("remove works", () => {
    const coll = new DummyColl();
    coll.add(new Dummy("1", "one", "first"));
    coll.remove("1");
    expect(coll.getById("1")).toBeUndefined();
  });

  test("replace works", () => {
    const coll = new DummyColl();
    coll.add(new Dummy("1", "one", "first"));
    coll.replace(new Dummy("1", "updated", "updated desc"));
    const item = coll.getById("1");
    expect(item).toBeDefined();
    expect(item?.name).toBe("updated");
  });

  test("replace throws when id not found", () => {
    const coll = new DummyColl();
    expect(() => coll.replace(new Dummy("1", "one", "first"))).toThrow();
  });
});

describe("Collection.toJSON removes underscores", () => {
  test("removes leading underscores from model fields", () => {
    const coll = new CharacterColl();
    coll.add(
      new Character(
        "1",
        "Rick",
        "desc",
        "sp1",
        "C-137",
        "C-32",
        "Alive",
        "Council",
        10,
      ),
    );

    const json = coll.toJSON()[0];

    expect(json.id).toBe("1");
    expect(json._id).toBeUndefined();
  });
});
