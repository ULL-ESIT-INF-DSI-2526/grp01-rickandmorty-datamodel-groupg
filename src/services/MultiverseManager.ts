import { DbManager } from "../database/DbManager.js";

/**
 * Core manager for handling high-level multiverse operations,
 * interdimensional events, and global consistency.
 */
export class MultiverseManager {
  constructor(private db: DbManager) {}

  /**
   * Records a character's travel to a different dimension.
   * @param characterId - The ID of the character traveling.
   * @param targetDimensionId - The ID of the destination dimension.
   * @throws Error if character or dimension is not found, or if destination is destroyed.
   */
  public async performTravel(characterId: string, targetDimensionId: string): Promise<void> {
    const character = this.db.characters.getById(characterId);
    const dimension = this.db.dimensions.getById(targetDimensionId);

    if (!character || !dimension) {
      throw new Error("Invalid character or dimension ID.");
    }

    if (dimension.status === "destroyed") {
      throw new Error("Cannot travel to a destroyed dimension.");
    }

    // Logic for updating character location would go here
    console.log(`Event: ${character.name} moved to ${dimension.name}`);
    
    // Persist changes
    await this.db.save();
  }

  /**
   * Generates a report of active dimensions and their technological advancement.
   * @returns An array of dimension summaries.
   */
  public getActiveDimensionsReport() {
    return this.db.dimensions
      .getAll()
      .filter((d) => d.status === "active")
      .map((d) => ({
        name: d.name,
        techLevel: d.techLevel,
        status: d.status,
      }));
  }

  /**
   * Identifies the most dangerous inventions currently registered.
   * @param threshold - The minimum danger level to consider.
   */
  public getDangerReport(threshold: number = 8) {
    return this.db.inventions
      .getAll()
      .filter((i) => i.dangerLevel >= threshold)
      .sort((a, b) => b.dangerLevel - a.dangerLevel);
  }
}