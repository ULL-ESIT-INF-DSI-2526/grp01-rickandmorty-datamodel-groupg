import { IInvention } from "../interfaces/IInvention.js";

/**
 * Represents an invention in the multiverse.
 */
export class Invention implements IInvention {
  constructor(
    /** @inheritdoc */
    public readonly id: string,

    /** @inheritdoc */
    public readonly name: string,

    /** @inheritdoc */
    public readonly description: string,

    /** @inheritdoc */
    public readonly dangerLevel: number,
  ) {
    if (dangerLevel < 1 || dangerLevel > 10)
      throw new Error("dangerLevel must be between 1 and 10");
  }
}
