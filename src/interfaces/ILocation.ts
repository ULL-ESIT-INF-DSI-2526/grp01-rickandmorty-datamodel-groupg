import { IEntity } from "./IEntity.js";

/**
 * Represents a location inside a dimension.
 */
export interface ILocation extends IEntity {
  /** Dimension ID that this location belongs to */
  dimensionId: string;
  /** Type of location */
  type: string;
  /** Amount of entities of the location */
  population: number;
}
