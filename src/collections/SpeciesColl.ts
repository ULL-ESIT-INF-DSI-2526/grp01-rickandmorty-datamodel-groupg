import { Collection } from "./Collection.js";
import { Species } from "../models/Species.js";

/**
 * Specialized collection for managing Species entities.
 */
export class SpeciesColl extends Collection<Species> {
  /**
   * Finds all species originating from a specific planet.
   * @param planet - The name of the planet.
   */
  findByPlanet(planet: string): Species[] {
    return this.getAll().filter((s) => s.planetOfOrigin === planet);
  }
}
