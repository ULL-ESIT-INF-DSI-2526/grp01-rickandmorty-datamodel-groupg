import { Collection } from "./Collection.js";
import { Location } from "../models/Location.js";

/**
 * Specialized collection for managing Location entities.
 */
export class LocationColl extends Collection<Location> {
  /**
   * Finds all locations belonging to a specific dimension.
   * @param dimensionId - The ID of the dimension.
   */
  findByDimension(dimensionId: string): Location[] {
    return this.getAll().filter((l) => l.dimensionId === dimensionId);
  }
}
