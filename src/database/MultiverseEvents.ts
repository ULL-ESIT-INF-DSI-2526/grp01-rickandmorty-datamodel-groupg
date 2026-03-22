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
   * Deploys an invention in a specific location.
   * Registers the deployment event in the activity log.
   *
   * @param inventionId - Identifier of the invention to deploy.
   * @param locationId - Identifier of the location where the invention is deployed.
   */
  deployInvention(inventionId: string, locationId: string): void {
    const invention = this.db.inventions.getById(inventionId);
    const location = this.db.locations.getById(locationId);


    if (!invention) {
      throw new Error("Invention not found");
    }


    if (!location) {
      throw new Error("Location not found");
    }


    this.activityLog.push("Invention " + invention.name + " deployed at location " + location.name + "(" + location.id + ")" );
  }


  /**
   * Neutralizes an invention in a specific location
   * Registers the neutralization event in the activity log
   *
   * @param inventionId - Identifier of the invention to neutralize
   * @param locationId - Identifier of the location where the invention is neutralized
   */
  neutralizeInvention(inventionId: string, locationId: string): void {
    const invention = this.db.inventions.getById(inventionId);
    const location = this.db.locations.getById(locationId);


    if (!invention) {
      throw new Error("Invention not found");
    }

    if (!location) {
      throw new Error("Location not found");
    }

    this.activityLog.push( "Invention " + invention.name + " neutralized at location " + location.name + "(" + location.id + ")" );
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
