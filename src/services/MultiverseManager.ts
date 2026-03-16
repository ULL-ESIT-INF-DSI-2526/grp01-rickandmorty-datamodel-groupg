import { DbManager } from "../database/DbManager.js";
import { DimensionStatus } from "../interfaces/IDimension.js";
import { MultiverseEvents } from "../database/MultiverseEvents.js";

export interface IMultiverseEvent {
  timestamp: string;
  type: "TRAVEL" | "DIMENSION_CHANGE" | "INVENTION_DEPLOY";
  description: string;
  subjectId: string;
}


export class MultiverseManager {
  
  private events: MultiverseEvents;

  constructor(private readonly db: DbManager) {
    this.events = new MultiverseEvents(db);
  }

  /**
   * Registers a character traveling to another dimension.
   */
  public async registerTravel(charId: string, destId: string, reason: string): Promise<void> {
    this.events.interdimensionalTravel(charId, destId);
    await this.events.save(); 
  }

  /**
   * Updates the state of a dimension.
   */
  public async updateDimensionState(id: string, state: DimensionStatus, reason: string): Promise<void> {
    if (state === "Destroyed") {
      this.events.destroyDimension(id);
    } 

    await this.events.save();
  }

  /**
   * Returns a technological report of all dimensions.
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
   * Returns analytics about character species.
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
   * Returns inventions ordered by danger level.
   */
  public getDangerReport(): any[] {
    return this.db.inventions.orderByDanger(true); 
  }

  /**
   * Returns the history of a character.
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
}