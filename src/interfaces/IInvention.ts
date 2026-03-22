import { IEntity } from "./IEntity.js";

/**
 * Represents an invention in the multiverse.
 */
export interface IInvention extends IEntity {
  /** Danger level of the invention */
  dangerLevel: number;
  /** ID string of invention */
  inventorId: string;
  /** Type of invention */
  type: string;
}
