import { Collection } from "./Collection";
import { Dimension } from "../models/Dimension";

/**
 * Specialized collection for managing Dimension entities.
 * Provides filtering utilities based on dimension properties.
 */
export class DimensionColl extends Collection<Dimension> {
  /**
   * Finds all dimensions with a specific status.
   * @param status - The status to filter by.
   */
  findByStatus(status: string): Dimension[] {
    return this.getAll().filter(d => d.status === status);
  }

  /**
   * Finds all dimensions with a specific technological level.
   * @param level - The technological level (1–10).
   */
  findByTechLevel(level: number): Dimension[] {
    return this.getAll().filter(d => d.techLevel === level);
  }
}
