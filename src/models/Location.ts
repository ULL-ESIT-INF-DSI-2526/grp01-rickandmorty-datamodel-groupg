import { ILocation } from "../interfaces/ILocation.js";

/**
 * Represents a location inside a dimension.
 */
export class Location implements ILocation {
  constructor(
    /** @inheritdoc */
    public readonly id: string,

    /** @inheritdoc */
    public readonly name: string,

    /** @inheritdoc */
    public readonly description: string,

    /** @inheritdoc */
    public readonly dimensionId: string,
  ) {
    if (!id.trim()) throw new Error("Location id cannot be empty");
    if (!name.trim()) throw new Error("Location name cannot be empty");
  }
}
