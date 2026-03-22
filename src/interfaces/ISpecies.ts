import { IEntity } from "./IEntity.js";

/**
 * Represents a species in the multiverse.
 */
export interface ISpecies extends IEntity {
  /** Planet where the species originated */
  origin: string;
  /** Type of species */
  type: string;
  /** Average time span of the species */
  averageLifespan: number;
}
