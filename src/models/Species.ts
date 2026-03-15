import { ISpecies } from "../interfaces/ISpecies.js";

/**
 * Represents a species in the multiverse.
 */
export class Species implements ISpecies {
  constructor(
    /** @inheritdoc */
    public readonly id: string,

    /** @inheritdoc */
    public readonly name: string,

    /** @inheritdoc */
    public readonly description: string,

    /** @inheritdoc */
    public readonly planetOfOrigin: string,
  ) {
    if (!id.trim()) throw new Error("Species id cannot be empty");
    if (!name.trim()) throw new Error("Species name cannot be empty");
  }
}
