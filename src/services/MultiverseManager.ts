import { DbManager } from "../database/DbManager.js";
import { DimensionStatus } from "../interfaces/IDimension.js";
import { MultiverseEvents } from "../database/MultiverseEvents.js";
import { Character } from "../models/Character.js";
import { Dimension } from "../models/Dimension.js";
import { Invention } from "../models/Invention.js";

/**
 * Represents a structured multiverse event.
 * Used to expose event information in a consistent format.
 */
export interface IMultiverseEvent {
  timestamp: string;
  type: "TRAVEL" | "DIMENSION_CHANGE" | "INVENTION_DEPLOY";
  description: string;
  subjectId: string;
}

/**
 * Service layer responsible for managing multiverse operations.
 * 
 * This class acts as an intermediary between the CLI and the database,
 * delegating event logic to MultiverseEvents and providing
 * higher-level reports and analytics.
 */
export class MultiverseManager {
  
  /**
 * Handles multiverse event logic such as travel and dimension changes.
 */
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
  public async registerTravel(charId: string, destId: string, reason: string): Promise<void> {
    this.events.interdimensionalTravel(charId, destId);
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
  public async updateDimensionState(id: string, state: DimensionStatus, reason: string): Promise<void> {
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
  public getTechReport(): { dimensions: any[], average: string } {

    const dimensions = this.db.dimensions.getAll();
    let total = 0;

    for (const d of dimensions) {
      total += d.techLevel;
    }

    const average = (total / dimensions.length).toFixed(1);
    return { dimensions, average };
  }


  /**
   * Generates analytics of characters grouped by species.
   * Counts how many characters belong to each species.
   * 
   * @returns Array with species names and number of characters per species.
   */
  public getVersionAnalytics(): { name: string, versions: number }[] {
    const species = this.db.species.getAll();
    const characters = this.db.characters.getAll();

    return species.map((s) => {

      const count = characters.filter(c => c.speciesId === s.id).length;

      return { name: s.name, versions: count };

    });
  }

  /**
   * Returns inventions ordered by their danger level.
   * Higher danger level indicates higher relevance.
   * 
   * @returns Array of inventions sorted by danger level.
   */
  public getDangerReport(): Invention[] {
    return this.db.inventions.orderByDanger(true); 
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
      .filter(event => event.includes(charId))
      .map(event => ({
        timestamp: new Date().toISOString(),
        type: "TRAVEL",
        description: event,
        subjectId: charId
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

    return { smartestCharacter: characters[0], mostAdvancedDimension: dimensions[0] };
  }
}