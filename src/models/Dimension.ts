import { IDimension, DimensionStatus } from "../interfaces/IDimension";

/**
 * Represents a dimension in the multiverse.
 * Performs validation on construction.
 */
export class Dimension implements IDimension {
  constructor(
    /** @inheritdoc */
    public readonly id: string,

    /** @inheritdoc */
    public readonly name: string,

    /** @inheritdoc */
    public readonly description: string,

    /** @inheritdoc */
    public readonly status: DimensionStatus,

    /** @inheritdoc */
    public readonly techLevel: number
  ) {
    if (!id.trim()) throw new Error("Dimension id cannot be empty");
    if (!name.trim()) throw new Error("Dimension name cannot be empty");
    if (techLevel < 1 || techLevel > 10)
      throw new Error("techLevel must be between 1 and 10");
  }
}
