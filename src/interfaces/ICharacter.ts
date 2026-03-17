import { IEntity } from "./IEntity.js";

/**
 * Represents a character in the multiverse.
 */
export interface ICharacter extends IEntity {
  /** ID of the species the character belongs to */
  speciesId: string;

  /** ID of the character's dimension */
  originDimensionId: string;

  /** Status of the character */
  status: string;

  /** Character's affiliation */
  affiliation: string;

  /** Intelligence level */
  intelligence: number;
}
