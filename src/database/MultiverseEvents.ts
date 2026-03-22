import { DbManager } from "./DbManager.js";

/**
 * Handles events that modify the multiverse state.
 * Provides operations such as interdimensional travel,
 * dimension destruction and invention activation.
 */
export class MultiverseEvents {
  /**
   * Internal log of multiverse events.
   */
  private activityLog: string[] = [];

  /**
   * Creates a new MultiverseEvents manager.
   * @param db - Database manager instance.
   */
  constructor(private db: DbManager) {}

  /**
   * Moves a character to another dimension.
   */
  interdimensionalTravel(
    characterId: string,
    dimensionId: string,
    reason: string,
  ): void {
    const character = this.db.characters.getById(characterId);
    const dimension = this.db.dimensions.getById(dimensionId);

    if (!character) {
      throw new Error("Character not found");
    }

    if (!dimension) {
      throw new Error("Dimension not found");
    }

    if (dimension.status === "Destroyed") {
      throw new Error("Cannot travel to destroyed dimension");
    }

    character.currentDimensionId = dimensionId;

    this.activityLog.push(
      "Character " +
        character.name +
        "(" +
        character.id +
        ") traveled to " +
        dimension.name +
        "(reason: " +
        reason +
        ")",
    );
  }

  /**
   * Returns the activity log.
   */
  getActivityLog(): string[] {
    return [...this.activityLog];
  }

  /**
   * Marks a dimension as destroyed.
   */
  destroyDimension(dimensionId: string): void {
    const dimension = this.db.dimensions.getById(dimensionId);

    if (!dimension) {
      throw new Error("Dimension not found");
    }

    const characters = this.db.characters.findByOriginDimension(dimensionId);

    if (characters.length > 0) {
      throw new Error("Cannot destroy dimension with characters inside");
    }

    dimension.status = "Destroyed";

    this.activityLog.push("Dimension " + dimension.name + " was destroyed");
  }

  /**
   * Activates an invention.
   */
  activateInvention(inventionId: string): void {
    const invention = this.db.inventions.getById(inventionId);

    if (!invention) {
      throw new Error("Invention not found");
    }

    this.activityLog.push("Invetion " + invention.name + " was activated ");
  }

  /**
   * Checks that references between entities are valid.
   */
  validateCoherence(): boolean {
    for (const character of this.db.characters.getAll()) {
      const species = this.db.species.getById(character.speciesId);
      const dimension = this.db.dimensions.getById(character.originDimensionId);

      if (!species || !dimension) {
        return false;
      }
    }

    return true;
  }

  /**
   * Saves changes to the database.
   */
  async save(): Promise<void> {
    await this.db.save();
  }
}
