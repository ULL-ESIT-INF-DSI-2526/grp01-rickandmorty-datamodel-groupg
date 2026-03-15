import { IEntity } from "./IEntity";

/**
 * Represents a species in the multiverse.
 */
export interface ISpecies extends IEntity {
  /** Planet where the species originated */
  planetOfOrigin: string;
}
