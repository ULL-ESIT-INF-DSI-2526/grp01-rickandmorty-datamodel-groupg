import { IEntity } from "./IEntity.js";

/**
 * Represents a character in the multiverse.
 */
export interface ICharacter extends IEntity {
  /** ID of the species the character belongs to */
  speciesId: string;

  /** ID of the character's origin dimension */
  originDimensionId: string;

  /** ID of the character's current dimension */
  currentDimensionId: string;

  /** Status of the character */
  status: string;

  /** Character's affiliation */
  affiliation: string;

  /** Intelligence level */
  intelligence: number;
}
