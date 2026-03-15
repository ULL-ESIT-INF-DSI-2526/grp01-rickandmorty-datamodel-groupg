import { DbManager } from "../database/DbManager.js";
import { Character } from "../models/Character.js";
import { Invention } from "../models/Invention.js";

/**
 * Service responsible for advanced filtering and sorting operations
 * across the multiverse data.
 */
export class SearchEngine {
  /**
   * Initializes the SearchEngine.
   * @param db - The database manager instance.
   */
  constructor(private db: DbManager) {}

  /**
   * Finds all alternative versions of a specific character by name.
   * @param name - The name to search for (partial matches allowed).
   * @returns An array of matching Character instances.
   */
  public findAlternativeVersions(name: string): Character[] {
    return this.db.characters
      .getAll()
      .filter((c) => c.name.toLowerCase().includes(name.toLowerCase()));
  }

  /**
   * Sorts characters based on a specific property.
   * @param criteria - The property to sort by ('name' or 'intelligence').
   * @param descending - Whether to sort in descending order.
   * @returns A sorted array of characters.
   */
  public sortCharacters(criteria: "name" | "intelligence", descending = false): Character[] {
    const sorted = [...this.db.characters.getAll()];
    return sorted.sort((a, b) => {
      const valA = a[criteria];
      const valB = b[criteria];
      const modifier = descending ? -1 : 1;

      if (valA < valB) return -1 * modifier;
      if (valA > valB) return 1 * modifier;
      return 0;
    });
  }

  /**
   * Filters inventions based on their danger level.
   * @param minLevel - Minimum danger level (1-10).
   * @returns An array of inventions meeting the criteria.
   */
  public getDangerousInventions(minLevel: number): Invention[] {
    return this.db.inventions.getAll().filter((i) => i.dangerLevel >= minLevel);
  }
}