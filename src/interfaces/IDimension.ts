import { IEntity } from "./IEntity";

/** Possible states for a dimension */
export type DimensionStatus = "active" | "destroyed" | "quarantine";

/**
 * Represents a dimension in the multiverse.
 * Extends the base IEntity interface.
 */
export interface IDimension extends IEntity {
  /** Current status of the dimension */
  status: DimensionStatus;

  /** Technological level (1–10) */
  techLevel: number;
}
