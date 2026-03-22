import { Collection } from "./Collection.js";
import { Location } from "../models/Location.js";

/**
 * Specific collection for managing Location.
 */
export class LocationColl extends Collection<Location> {
  /**
   * Finds all locations of a specific type.
   * @param type - Location type.
   */
  findByType(type: string): Location[] {
    return this.getAll().filter((l) => l.type === type);
  }

  /**
   * Finds all locations of a specific dimension.
   * @param dimensionId - The dimension identifier.
   */
  findByDimension(dimensionId: string): Location[] {
    return this.getAll().filter((l) => l.dimensionId === dimensionId);
  }

  /**
   * Finds all locations with population above a minimum.
   * @param minPopulation - Minimum population.
   */
  findByMinPopulation(minPopulation: number): Location[] {
    return this.getAll().filter((l) => l.population >= minPopulation);
  }

  /**
   * Orders locations by population.
   * @param descending - Sort in descending order.
   */
  orderByPopulation(descending = false): Location[] {
    return [...this.getAll()].sort((a, b) =>
      descending ? b.population - a.population : a.population - b.population,
    );
  }
}
