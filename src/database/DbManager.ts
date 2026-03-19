import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

import { ICharacter } from "../interfaces/ICharacter.js";
import { IDimension } from "../interfaces/IDimension.js";
import { ISpecies } from "../interfaces/ISpecies.js";
import { ILocation } from "../interfaces/ILocation.js";
import { IInvention } from "../interfaces/IInvention.js";

import { Character } from "../models/Character.js";
import { Dimension } from "../models/Dimension.js";
import { Species } from "../models/Species.js";
import { Location } from "../models/Location.js";
import { Invention } from "../models/Invention.js";

import { CharacterColl } from "../collections/CharacterColl.js";
import { DimensionColl } from "../collections/DimensionColl.js";
import { SpeciesColl } from "../collections/SpeciesColl.js";
import { LocationColl } from "../collections/LocationColl.js";
import { InventionColl } from "../collections/InventionColl.js";

/**
 * Defines the structure of the JSON database file.
 */
export interface DbSchema {
  characters: ICharacter[];
  dimensions: IDimension[];
  species: ISpecies[];
  locations: ILocation[];
  inventions: IInvention[];
}

/**
 * Database manager responsible for loading and saving
 * all multiverse data using Lowdb.
 */
export class DbManager {
  /** Lowdb instance using the typed DbSchema */
  private db: Low<DbSchema>;

  /** Collections */
  public readonly characters = new CharacterColl();
  public readonly dimensions = new DimensionColl();
  public readonly species = new SpeciesColl();
  public readonly locations = new LocationColl();
  public readonly inventions = new InventionColl();

  /**
   * Creates a new database manager.
   * @param path - Path to the JSON file.
   */
  constructor(path = "data/database.json") {
    this.db = new Low<DbSchema>(new JSONFile(path), {
      characters: [],
      dimensions: [],
      species: [],
      locations: [],
      inventions: [],
    });
  }

  /**
   * Loads data from the JSON file and converts it into model instances.
   */
  async load(): Promise<void> {
    await this.db.read();

    const { characters, dimensions, species, locations, inventions } =
      this.db.data;

    this.characters.load(
      characters.map(
        (c) =>
          new Character(
            c.id,
            c.name,
            c.description,
            c.speciesId,
            c.originDimensionId,
            c.currentDimensionId,
            c.status,
            c.affiliation,
            c.intelligence,
          ),
      ),
    );

    this.dimensions.load(
      dimensions.map(
        (d) =>
          new Dimension(d.id, d.name, d.description, d.status, d.techLevel),
      ),
    );

    this.species.load(
      species.map(
        (s) =>
          new Species(
            s.id,
            s.name,
            s.description,
            s.origin,
            s.type,
            s.averageLifespan,
          ),
      ),
    );

    this.locations.load(
      locations.map(
        (l) =>
          new Location(
            l.id,
            l.name,
            l.description,
            l.type,
            l.dimensionId,
            l.population,
          ),
      ),
    );

    this.inventions.load(
      inventions.map(
        (i) =>
          new Invention(
            i.id,
            i.name,
            i.description,
            i.inventorId,
            i.type,
            i.dangerLevel,
          ),
      ),
    );
  }

  /**
   * Saves the current state of all collections into the JSON file.
   */
  async save(): Promise<void> {
    this.db.data.characters = this.characters.toJSON();
    this.db.data.dimensions = this.dimensions.toJSON();
    this.db.data.species = this.species.toJSON();
    this.db.data.locations = this.locations.toJSON();
    this.db.data.inventions = this.inventions.toJSON();

    await this.db.write();
  }
}
