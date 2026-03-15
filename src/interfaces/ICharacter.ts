import { IEntity } from "./IEntity.js";

/**
 * Represents a character in the multiverse.
 */
export interface ICharacter extends IEntity {
  /** ID of the species the character belongs to */
  speciesId: string;

  /** ID of the character's origin dimension */
  originDimensionId: string;

  /** Life status of the character */
  status: string;

  /** Group or faction the character belongs to */
  affiliation: string;

  /** Intelligence level (1–10) */
  intelligence: number;
}
