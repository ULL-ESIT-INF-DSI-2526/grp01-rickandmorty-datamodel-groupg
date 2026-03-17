import { Collection } from "./Collection.js";
import { Character } from "../models/Character.js";

/**
 * Specific collection for managing Characters.
 */
export class CharacterColl extends Collection<Character> {
  /**
   * Finds all characters with a speciesID given.
   * @param speciesId - The species identifier.
   */
  findBySpecies(speciesId: string): Character[] {
    return this.getAll().filter((c) => c.speciesId === speciesId);
  }

  /**
   * Finds all characters with a dimensionID given.
   * @param dimensionId - The origin dimension ID.
   */
  findByOriginDimension(dimensionId: string): Character[] {
    return this.getAll().filter((c) => c.originDimensionId === dimensionId);
  }

  /**
   * Finds all characters with a given status.
   * @param status - Character status.
   */
  findByStatus(status: string): Character[] {
    return this.getAll().filter((c) => c.status === status);
  }

  /**
   * Finds all characters from a specific affiliation.
   * @param affiliation - Affiliation name.
   */
  findByAffiliation(affiliation: string): Character[] {
    return this.getAll().filter((c) => c.affiliation === affiliation);
  }

  /**
   * Orders characters by intelligence.
   * @param descending - Sort in descending order.
   */
  orderByIntelligence(descending = false): Character[] {
    return [...this.getAll()].sort((a, b) =>
      descending
        ? b.intelligence - a.intelligence
        : a.intelligence - b.intelligence,
    );
  }
}
