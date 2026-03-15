import { IEntity } from "./IEntity.js";

/**
 * Represents a location inside a dimension.
 */
export interface ILocation extends IEntity {
  /** ID of the dimension this location belongs to */
  dimensionId: string;
}
