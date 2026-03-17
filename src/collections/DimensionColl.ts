import { Collection } from "./Collection.js";
import { Dimension } from "../models/Dimension.js";

/**
 * Specific collection for managing Dimensions.
 */
export class DimensionColl extends Collection<Dimension> {
  /**
   * Dimension finder using dimension status.
   * @param status - Dimension status.
   */
  findByStatus(status: string): Dimension[] {
    return this.getAll().filter((d) => d.status === status);
  }

  /**
   * Finds all dimensions with a specific technological level.
   * @param techLevel - Tech level.
   */
  findByTechLevel(techLevel: number): Dimension[] {
    return this.getAll().filter((d) => d.techLevel === techLevel);
  }

  /**
   * Orders dimensions by technological level.
   * @param descending - Sort in descending order.
   */
  orderByTechLevel(descending = false): Dimension[] {
    return [...this.getAll()].sort((a, b) =>
      descending ? b.techLevel - a.techLevel : a.techLevel - b.techLevel,
    );
  }
}
