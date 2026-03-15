import { Collection } from "./Collection.js";
import { Invention } from "../models/Invention.js";

/**
 * Specialized collection for managing Invention entities.
 */
export class InventionColl extends Collection<Invention> {
  /**
   * Finds all inventions with a specific danger level.
   * @param level - Danger level (1–10).
   */
  findByDangerLevel(level: number): Invention[] {
    return this.getAll().filter((i) => i.dangerLevel === level);
  }

  /**
   * Returns inventions sorted by danger level.
   * @param desc - If true, sorts from highest to lowest.
   */
  orderByDanger(desc = false): Invention[] {
    return [...this.getAll()].sort((a, b) =>
      desc ? b.dangerLevel - a.dangerLevel : a.dangerLevel - b.dangerLevel,
    );
  }
}
