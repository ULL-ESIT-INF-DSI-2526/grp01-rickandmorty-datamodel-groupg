import { Collection } from "./Collection.js";
import { Invention } from "../models/Invention.js";

/**
 * Specialized collection for managing Invention entities.
 */
export class InventionColl extends Collection<Invention> {
  /**
   * Finds all inventions created by a specific character.
   * @param inventorId - The ID of the inventor.
   */
  findByInventor(inventorId: string): Invention[] {
    return this.getAll().filter((i) => i.inventorId === inventorId);
  }

  /**
   * Finds all inventions of a specific type.
   * @param type - Invention category (Weapon, Device, etc.).
   */
  findByType(type: string): Invention[] {
    return this.getAll().filter((i) => i.type === type);
  }

  /**
   * Orders inventions by danger level.
   * @param descending - Whether to sort in descending order.
   */
  orderByDanger(descending = false): Invention[] {
    return [...this.getAll()].sort((a, b) =>
      descending ? b.dangerLevel - a.dangerLevel : a.dangerLevel - b.dangerLevel
    );
  }
}
