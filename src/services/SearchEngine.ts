import { DbManager } from "../database/DbManager.js";
import { Character } from "../models/Character.js";
import { Dimension } from "../models/Dimension.js";
import { Location } from "../models/Location.js";
import { Invention } from "../models/Invention.js";

/**
 * Service responsible for advanced filtering and sorting across the multiverse.
 */
export class SearchEngine {
  constructor(private readonly db: DbManager) {}

  /**
   * Searches characters with multiple filters and specific sorting.
   * @param filters - filters to apply to the search.
   * @param sortBy - The way we want to sort, whether by "intelligence" or "name" (default is "name")
   * @param descending - the way they are ordered, (True is descending, False is ascending)
   * @returns Character array of the characters that the filters meet
   */
  public searchCharacters(
    filters: {
      name?: string;
      speciesId?: string;
      affiliation?: string;
      status?: string;
      originId?: string;
    },
    sortBy: "name" | "intelligence" = "name",
    descending: boolean = false,
  ): Character[] {
    let results = this.db.characters.getAll();

    if (filters.name) {
      results = results.filter((c) =>
        c.name.toLowerCase().includes(filters.name!.toLowerCase()),
      );
    }
    if (filters.speciesId) {
      results = results.filter((c) => c.speciesId === filters.speciesId);
    }
    if (filters.affiliation) {
      results = results.filter((c) => c.affiliation === filters.affiliation);
    }
    if (filters.status) {
      results = results.filter(
        (c) =>
          c.status.toLocaleLowerCase() === filters.status?.toLocaleLowerCase(),
      );
    }
    if (filters.originId) {
      results = results.filter((c) => c.originDimensionId === filters.originId);
    }

    return results.sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];
      const mod = descending ? -1 : 1;
      return valA < valB ? -1 * mod : valA > valB ? 1 * mod : 0;
    });
  }

  /**
   * Searches dimensions by name, status, or tech level.
   * @param name - Optional name for filtering
   * @param status - Optional status for filtering
   * @param techLevel - Optional tech level for filtering
   * @returns Dimension array of the dimensions that the filters meet
   */
  public searchDimensions(
    name?: string,
    status?: string,
    techLevel?: number,
  ): Dimension[] {
    let results = this.db.dimensions.getAll();
    if (name) {
      results = results.filter((d) =>
        d.name.toLowerCase().includes(name.toLowerCase()),
      );
    }
    if (status) {
      results = results.filter(
        (d) => d.status.toLowerCase() === status.toLowerCase(),
      );
    }
    if (techLevel !== undefined) {
      results = results.filter((d) => d.techLevel === techLevel);
    }
    return results;
  }

  /**
   * Searches locations by name, type, or dimension.
   * @param name - Optional name for filtering
   * @param type - Optional type for filtering
   * @param dimensionId -Optional ID for filtering
   */
  public searchLocations(
    name?: string,
    type?: string,
    dimensionId?: string,
  ): Location[] {
    let results = this.db.locations.getAll();
    if (name) {
      results = results.filter((l) =>
        l.name.toLowerCase().includes(name.toLowerCase()),
      );
    }
    if (type) {
      results = results.filter((l) => l.type === type);
    }
    if (dimensionId) {
      results = results.filter((l) => l.dimensionId === dimensionId);
    }
    return results;
  }

  /**
   * Searches inventions by name, type, inventor, or danger level
   * @param name - Optional name for filtering
   * @param type - Optional type for filtering
   * @param inventorId - Optional ID for filtering
   * @param dangerLevel - Optional danger level for filtering
   */
  public searchInventions(
    name?: string,
    type?: string,
    inventorId?: string,
    dangerLevel?: number,
  ): Invention[] {
    let results = this.db.inventions.getAll();
    if (name) {
      results = results.filter((i) =>
        i.name.toLowerCase().includes(name.toLowerCase()),
      );
    }
    if (type) {
      results = results.filter((i) => i.type === type);
    }
    if (inventorId) {
      results = results.filter((i) => i.inventorId === inventorId);
    }
    if (dangerLevel !== undefined) {
      results = results.filter((i) => i.dangerLevel === dangerLevel);
    }
    return results;
  }

  /**
   * Locates all alternative versions of a specific character name.
   * @param name - name of the character to find
   */
  public findAlternativeVersions(name: string): Character[] {
    return this.db.characters
      .getAll()
      .filter((c) => c.name.toLowerCase().includes(name.toLowerCase()));
  }
}
