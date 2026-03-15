import { Collection } from "./Collection.js";
import { Character } from "../models/Character.js";

/**
 * Specialized collection for managing Character entities.
 */
export class CharacterColl extends Collection<Character> {
  /**
   * Finds all characters belonging to a specific species.
   * @param speciesId - The species identifier.
   */
  findBySpecies(speciesId: string): Character[] {
    return this.getAll().filter((c) => c.speciesId === speciesId);
  }

  /**
   * Finds all characters originating from a specific dimension.
   * @param dimensionId - The origin dimension identifier.
   */
  findByOriginDimension(dimensionId: string): Character[] {
    return this.getAll().filter((c) => c.originDimensionId === dimensionId);
  }

  /**
   * Finds all characters with a given status.
   * @param status - Character status (Alive, Dead, Unknown, etc.).
   */
  findByStatus(status: string): Character[] {
    return this.getAll().filter((c) => c.status === status);
  }

  /**
   * Finds all characters belonging to a specific affiliation.
   * @param affiliation - Group or faction name.
   */
  findByAffiliation(affiliation: string): Character[] {
    return this.getAll().filter((c) => c.affiliation === affiliation);
  }

  /**
   * Orders characters by intelligence.
   * @param descending - Whether to sort in descending order.
   */
  orderByIntelligence(descending = false): Character[] {
    return [...this.getAll()].sort((a, b) =>
      descending ? b.intelligence - a.intelligence : a.intelligence - b.intelligence
    );
  }
}
