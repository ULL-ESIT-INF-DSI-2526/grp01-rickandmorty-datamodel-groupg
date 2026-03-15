import { ICharacter, CharacterStatus } from "../interfaces/ICharacter";

/**
 * Represents a character in the multiverse.
 * Validates intelligence, name, and identifiers.
 */
export class Character implements ICharacter {
  constructor(
    /** @inheritdoc */
    public readonly id: string,

    /** @inheritdoc */
    public readonly name: string,

    /** @inheritdoc */
    public readonly description: string,

    /** @inheritdoc */
    public readonly speciesId: string,

    /** @inheritdoc */
    public readonly originDimensionId: string,

    /** @inheritdoc */
    public readonly status: CharacterStatus,

    /** @inheritdoc */
    public readonly affiliation: string,

    /** @inheritdoc */
    public readonly intelligence: number,
  ) {
    if (!id.trim()) throw new Error("Character id cannot be empty");
    if (!name.trim()) throw new Error("Character name cannot be empty");
    if (intelligence < 1 || intelligence > 10)
      throw new Error("Intelligence must be between 1 and 10");
  }
}
