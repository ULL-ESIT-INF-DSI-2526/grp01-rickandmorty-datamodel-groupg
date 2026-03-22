import { IEntity } from "./IEntity.js";

/** Possible states of a dimension */
export type DimensionStatus = "Active" | "Destroyed" | "Quarantined" | string;

/**
 * Represents a dimension in the multiverse.
 */
export interface IDimension extends IEntity {
  /** Current state of the dimension */
  status: DimensionStatus;

  /** Technological level of the dimension */
  techLevel: number;
}
