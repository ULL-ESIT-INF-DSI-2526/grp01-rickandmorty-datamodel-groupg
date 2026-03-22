import { describe, test, expect } from "vitest";

import { Character } from "../src/models/Character.js";
import { Dimension } from "../src/models/Dimension.js";
import { Species } from "../src/models/Species.js";
import { Location } from "../src/models/Location.js";
import { Invention } from "../src/models/Invention.js";

describe("Models – full getter/setter coverage", () => {
  test("Character – all getters and setters", () => {
    const c = new Character(
      "1",
      "Rick",
      "desc",
      "sp1",
      "C-137",
      "C-137",
      "Alive",
      "Council",
      5,
    );

    expect(c.id).toBe("1");
    c.id = "2";
    expect(c.id).toBe("2");

    expect(c.name).toBe("Rick");
    c.name = "Morty";
    expect(c.name).toBe("Morty");

    expect(c.description).toBe("desc");
    c.description = "new desc";
    expect(c.description).toBe("new desc");

    expect(c.speciesId).toBe("sp1");
    c.speciesId = "sp2";
    expect(c.speciesId).toBe("sp2");

    expect(c.originDimensionId).toBe("C-137");
    c.originDimensionId = "C-138";
    expect(c.originDimensionId).toBe("C-138");

    expect(c.status).toBe("Alive");
    c.status = "Dead";
    expect(c.status).toBe("Dead");

    expect(c.affiliation).toBe("Council");
    c.affiliation = "None";
    expect(c.affiliation).toBe("None");

    expect(c.intelligence).toBe(5);
    c.intelligence = 10;
    expect(c.intelligence).toBe(10);

    expect(() => (c.intelligence = 0)).toThrow();
    expect(() => (c.intelligence = 11)).toThrow();
  });

  test("Dimension – all getters and setters", () => {
    const d = new Dimension("d1", "C-137", "desc", "Active", 5);

    expect(d.id).toBe("d1");
    d.id = "d2";
    expect(d.id).toBe("d2");

    expect(d.name).toBe("C-137");
    d.name = "New";
    expect(d.name).toBe("New");

    expect(d.description).toBe("desc");
    d.description = "new desc";
    expect(d.description).toBe("new desc");

    expect(d.status).toBe("Active");
    d.status = "Destroyed";
    expect(d.status).toBe("Destroyed");

    expect(d.techLevel).toBe(5);
    d.techLevel = 10;
    expect(d.techLevel).toBe(10);

    expect(() => (d.techLevel = 0)).toThrow();
    expect(() => (d.techLevel = 11)).toThrow();
  });

  test("Species – all getters and setters", () => {
    const s = new Species("s1", "Human", "desc", "Earth", "Humanoid", 80);

    expect(s.id).toBe("s1");
    s.id = "s2";
    expect(s.id).toBe("s2");

    expect(s.name).toBe("Human");
    s.name = "Alien";
    expect(s.name).toBe("Alien");

    expect(s.description).toBe("desc");
    s.description = "new desc";
    expect(s.description).toBe("new desc");

    expect(s.origin).toBe("Earth");
    s.origin = "Mars";
    expect(s.origin).toBe("Mars");

    expect(s.type).toBe("Humanoid");
    s.type = "Mutant";
    expect(s.type).toBe("Mutant");

    expect(s.averageLifespan).toBe(80);
    s.averageLifespan = 120;
    expect(s.averageLifespan).toBe(120);

    expect(() => (s.averageLifespan = -1)).toThrow();
  });

  test("Location – all getters and setters", () => {
    const l = new Location("l1", "Earth", "desc", "Planet", "C-137", 100);

    expect(l.id).toBe("l1");
    l.id = "l2";
    expect(l.id).toBe("l2");

    expect(l.name).toBe("Earth");
    l.name = "Mars";
    expect(l.name).toBe("Mars");

    expect(l.description).toBe("desc");
    l.description = "new desc";
    expect(l.description).toBe("new desc");

    expect(l.type).toBe("Planet");
    l.type = "Station";
    expect(l.type).toBe("Station");

    expect(l.dimensionId).toBe("C-137");
    l.dimensionId = "C-138";
    expect(l.dimensionId).toBe("C-138");

    expect(l.population).toBe(100);
    l.population = 200;
    expect(l.population).toBe(200);

    expect(() => (l.population = -5)).toThrow();
  });

  test("Invention – all getters and setters", () => {
    const i = new Invention("i1", "Portal Gun", "desc", "rick1", "Device", 5);

    expect(i.id).toBe("i1");
    i.id = "i2";
    expect(i.id).toBe("i2");

    expect(i.name).toBe("Portal Gun");
    i.name = "New";
    expect(i.name).toBe("New");

    expect(i.description).toBe("desc");
    i.description = "new desc";
    expect(i.description).toBe("new desc");

    expect(i.inventorId).toBe("rick1");
    i.inventorId = "rick2";
    expect(i.inventorId).toBe("rick2");

    expect(i.type).toBe("Device");
    i.type = "Robot";
    expect(i.type).toBe("Robot");

    expect(i.dangerLevel).toBe(5);
    i.dangerLevel = 10;
    expect(i.dangerLevel).toBe(10);

    expect(() => (i.dangerLevel = 0)).toThrow();
    expect(() => (i.dangerLevel = 11)).toThrow();
  });
});
