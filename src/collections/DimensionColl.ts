import { Collection } from "./Collection.js";
import { Dimension } from "../models/Dimension.js";

/**
 * Specialized collection for managing Dimension entities.
 */
export class DimensionColl extends Collection<Dimension> {
  /**
   * Finds all dimensions with a specific status.
   * @param status - Dimension status (Active, Destroyed, etc.).
   */
  findByStatus(status: string): Dimension[] {
    return this.getAll().filter((d) => d.status === status);
  }

  /**
   * Finds all dimensions with a specific technological level.
   * @param techLevel - Tech level (1–10).
   */
  findByTechLevel(techLevel: number): Dimension[] {
    return this.getAll().filter((d) => d.techLevel === techLevel);
  }

  /**
   * Orders dimensions by technological level.
   * @param descending - Whether to sort in descending order.
   */
  orderByTechLevel(descending = false): Dimension[] {
    return [...this.getAll()].sort((a, b) =>
      descending ? b.techLevel - a.techLevel : a.techLevel - b.techLevel
    );
  }
}
