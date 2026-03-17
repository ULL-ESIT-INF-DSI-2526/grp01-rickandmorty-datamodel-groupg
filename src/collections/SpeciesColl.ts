import { Collection } from "./Collection.js";
import { Species } from "../models/Species.js";

/**
 * Specific collection for managing Species.
 */
export class SpeciesColl extends Collection<Species> {
  /**
   * Finds all species from a specific place.
   * @param origin - The origin planet or dimension.
   */
  findByOrigin(origin: string): Species[] {
    return this.getAll().filter((s) => s.origin === origin);
  }

  /**
   * Finds all species of a given biological type.
   * @param type - Biological classification.
   */
  findByType(type: string): Species[] {
    return this.getAll().filter((s) => s.type === type);
  }

  /**
   * Orders species by average lifespan.
   * @param descending - Sort in descending order.
   */
  orderByLifespan(descending = false): Species[] {
    return [...this.getAll()].sort((a, b) =>
      descending
        ? b.averageLifespan - a.averageLifespan
        : a.averageLifespan - b.averageLifespan,
    );
  }
}
