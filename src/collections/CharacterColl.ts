import { Collection } from "./Collection.js";
import { Character } from "../models/Character.js";

/**
 * Specialized collection for managing Character entities.
 * Provides advanced search and sorting utilities.
 */
export class CharacterColl extends Collection<Character> {
  /**
   * Finds all characters belonging to a specific species.
   * @param speciesId - The ID of the species.
   */
  findBySpecies(speciesId: string): Character[] {
    return this.getAll().filter((c) => c.speciesId === speciesId);
  }

  /**
   * Finds all characters with a specific affiliation.
   * @param affiliation - The affiliation or group name.
   */
  findByAffiliation(affiliation: string): Character[] {
    return this.getAll().filter((c) => c.affiliation === affiliation);
  }

  /**
   * Returns characters sorted by intelligence.
   * @param desc - If true, sorts from highest to lowest.
   */
  orderByIntelligence(desc = false): Character[] {
    return [...this.getAll()].sort((a, b) =>
      desc ? b.intelligence - a.intelligence : a.intelligence - b.intelligence,
    );
  }
}
