import { DbManager } from "../database/DbManager.js";
import { DimensionStatus } from "../interfaces/IDimension.js";
import { MultiverseEvents } from "../database/MultiverseEvents.js";
import { Character } from "../models/Character.js";
import { Dimension } from "../models/Dimension.js";
import { Invention } from "../models/Invention.js";
import { IMultiverseEvent } from "../interfaces/IMultiverseEvent.js";

/**
 * Service layer responsible for managing multiverse operations.
 *
 * This class acts as an intermediary between the CLI and the database,
 * delegating event logic to MultiverseEvents and providing
 * higher-level reports and analytics.
 */
export class MultiverseManager {
  private events: MultiverseEvents;

  /**
   * Creates a new MultiverseManager instance.
   *
   * @param db - Database manager used to access and persist data.
   */
  constructor(private readonly db: DbManager) {
    this.events = new MultiverseEvents(db);
  }

  /**
   * Returns the most intelligent characters ordered by intelligence.
   * Only the top 10 characters are included.
   *
   * @returns Array of the most intelligent characters.
   */
  public getSmartestCharacters(): Character[] {
    const characters = this.db.characters.orderByIntelligence(true);
    return characters.slice(0, 10);
  }

  /**
   * Returns the most technologically advanced dimensions.
   * Higher tech level is interpreted as higher potential danger.
   * Only the top 10 dimensions are included.
   *
   * @returns Array of the most advanced dimensions.
   */
  public getDangerousDimensions(): Dimension[] {
    const dimens = this.db.dimensions.orderByTechLevel(true);
    return dimens.slice(0, 10);
  }

  /**
   * Registers a travel event for a character between dimensions.
   * Updates the character's origin dimension and persists the changes.
   *
   * @param charId - Identifier of the character.
   * @param destId - Identifier of the destination dimension.
   * @param reason - Reason for the travel (not stored).
   */
  public async registerTravel(
    charId: string,
    destId: string,
    reason: string,
  ): Promise<void> {
    this.events.interdimensionalTravel(charId, destId, reason);
    await this.events.save();
  }

  /**
   * Updates the state of a dimension.
   * If the state is set to "Destroyed", the dimension is marked accordingly.
   * Changes are saved to the database.
   *
   * @param id - Identifier of the dimension.
   * @param state - New state of the dimension.
   * @param reason - Reason for the update (not stored).
   */
  public async updateDimensionState(
    id: string,
    state: DimensionStatus,
    reason: string,
  ): Promise<void> {
    if (state === "Destroyed") {
      this.events.destroyDimension(id);
    }

    await this.events.save();
  }

  /**
   * Generates a report of all dimensions including their average tech level.
   *
   * @returns Object containing the list of dimensions and the average tech level.
   */
  public getTechReport(): { dimensions: any[]; average: string } {
    const dimensions = this.db.dimensions.getAll();
    let total = 0;

    for (const d of dimensions) {
      total += d.techLevel;
    }

    const average = (total / dimensions.length).toFixed(1);
    return { dimensions, average };
  }

  /**
   * Generates a report of characters with the highest number of alternative versions
   *
   * @returns Array of objects with the identity name and the number of versions found
   */
  public getVersionAnalytics(): { name: string; versions: number }[] {
    const characters = this.db.characters.getAll();
    const versionMap = new Map<string, number>();

    characters.forEach((char) => {
      const nameParts = char.name.split(" ");
      let baseName = nameParts[0];

      if (
        baseName.toLowerCase().replace(".", "") === "mr" &&
        nameParts.length > 1
      ) {
        baseName = nameParts[1];
      }

      const identity = baseName.trim();

      const currentCount = versionMap.get(identity) || 0;
      versionMap.set(identity, currentCount + 1);
    });

    const results = Array.from(versionMap.entries())
      .map(([name, count]) => {
        return { name: name, versions: count };
      })
      .filter((item) => {
        return item.versions > 1;
      });

    return results.sort((a, b) => {
      return b.versions - a.versions;
    });
  }

  /**
   * create the report of the most dangerous inventions and their current location with the inventor dimention
   * @returns Detailed report of inventions with level >= 7 and where they are
   */

  public getDangerReport(): {
    invention: string;
    danger: number;
    location: string;
  }[] {
    const inventions = this.db.inventions.getAll();

    return inventions
      .filter((inv) => inv.dangerLevel >= 7)
      .map((inv) => {
        const inventor = this.db.characters.getById(inv.inventorId);
        const location = inventor ? inventor.originDimensionId : "Unknown";

        return {
          invention: inv.name,
          danger: inv.dangerLevel,
          location: location,
        };
      })
      .sort((a, b) => b.danger - a.danger);
  }

  /**
   * Retrieves the history of events related to a character.
   * Filters the activity log and maps it to structured event objects.
   *
   * @param charId - Identifier of the character.
   * @returns Array of events associated with the character.
   */
  public getCharacterHistory(charId: string): IMultiverseEvent[] {
    const log = this.events.getActivityLog();

    return log
      .filter((event) => event.includes(charId))
      .map((event) => ({
        timestamp: new Date().toISOString(),
        type: "TRAVEL",
        description: event,
        subjectId: charId,
      }));
  }

  /**
   * Generates a combined report using multiple collections.
   * Includes the most intelligent character and the most advanced dimension.
   *
   * @returns Object with key information from characters and dimensions.
   */
  public getCombinedReport() {
    const characters = this.db.characters.orderByIntelligence(true);
    const dimensions = this.db.dimensions.orderByTechLevel(true);

    return {
      smartestCharacter: characters[0],
      mostAdvancedDimension: dimensions[0],
    };
  }
}
