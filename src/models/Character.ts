import { ICharacter } from "../interfaces/ICharacter.js";

/**
 * Domain model representing a character in the multiverse.
 */
export class Character implements ICharacter {
  private _id: string;
  private _name: string;
  private _description: string;
  private _speciesId: string;
  private _originDimensionId: string;
  private _status: string;
  private _affiliation: string;
  private _intelligence: number;

  constructor(
    id: string,
    name: string,
    description: string,
    speciesId: string,
    originDimensionId: string,
    status: string,
    affiliation: string,
    intelligence: number,
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._speciesId = speciesId;
    this._originDimensionId = originDimensionId;
    this._status = status;
    this._affiliation = affiliation;
    this._intelligence = intelligence;
  }

  /** Unique identifier */
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  /** Character's name */
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  /** Short biography or notes */
  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }

  /** ID of the species the character belongs to */
  get speciesId(): string {
    return this._speciesId;
  }
  set speciesId(value: string) {
    this._speciesId = value;
  }

  /** ID of the character's origin dimension */
  get originDimensionId(): string {
    return this._originDimensionId;
  }
  set originDimensionId(value: string) {
    this._originDimensionId = value;
  }

  /** Life status (Alive, Dead, Unknown, etc.) */
  get status() {
    return this._status;
  }
  set status(value: string) {
    this._status = value;
  }

  /** Group or faction the character belongs to */
  get affiliation(): string {
    return this._affiliation;
  }
  set affiliation(value: string) {
    this._affiliation = value;
  }

  /** Intelligence level (1–10) */
  get intelligence(): number {
    return this._intelligence;
  }
  set intelligence(value: number) {
    if (value < 1 || value > 10) {
      throw new Error("Intelligence must be between 1 and 10.");
    }
    this._intelligence = value;
  }
}
