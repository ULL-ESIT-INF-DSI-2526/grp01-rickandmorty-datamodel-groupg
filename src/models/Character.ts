import { ICharacter } from "../interfaces/ICharacter.js";

/**
 * Model that respresents a character in the multiverse.
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
  private _currentDimensionId: string;

  constructor(
    id: string,
    name: string,
    description: string,
    speciesId: string,
    originDimensionId: string,
    currentDimensionId: string,
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
    this._currentDimensionId = currentDimensionId;
  }

  /** Character id */
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  /** Name of the character */
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  /** Description of the character */
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

  /** ID of the character's current dimension */
  get currentDimensionId(): string {
    return this._currentDimensionId;
  }
  set currentDimensionId(value: string) {
    this._currentDimensionId = value;
  }

  /** Life status of the character */
  get status() {
    return this._status;
  }
  set status(value: string) {
    this._status = value;
  }

  /** Character's affiliation */
  get affiliation(): string {
    return this._affiliation;
  }
  set affiliation(value: string) {
    this._affiliation = value;
  }

  /** Intelligence level of the character */
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
