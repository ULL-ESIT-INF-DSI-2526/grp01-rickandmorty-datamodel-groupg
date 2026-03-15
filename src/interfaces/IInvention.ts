import { IEntity } from "./IEntity.js";

/**
 * Represents an invention created in the multiverse.
 */
export interface IInvention extends IEntity {
  /** Danger level (1–10) */
  dangerLevel: number;
}
