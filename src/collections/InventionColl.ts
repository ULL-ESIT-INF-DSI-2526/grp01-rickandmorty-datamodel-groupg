import { Collection } from "./Collection.js";
import { Invention } from "../models/Invention.js";

/**
 * Specific collection for managing Inventions.
 */
export class InventionColl extends Collection<Invention> {
  /**
   * Finds all inventions of a specific character.
   * @param inventorId - The ID of the inventor.
   */
  findByInventor(inventorId: string): Invention[] {
    return this.getAll().filter((i) => i.inventorId === inventorId);
  }

  /**
   * Finds all inventions using a specific type.
   * @param type - Invention category.
   */
  findByType(type: string): Invention[] {
    return this.getAll().filter((i) => i.type === type);
  }

  /**
   * Orders inventions by danger level.
   * @param descending - Sort in descending order.
   */
  orderByDanger(descending = false): Invention[] {
    return [...this.getAll()].sort((a, b) =>
      descending ? b.dangerLevel - a.dangerLevel : a.dangerLevel - b.dangerLevel
    );
  }
}
