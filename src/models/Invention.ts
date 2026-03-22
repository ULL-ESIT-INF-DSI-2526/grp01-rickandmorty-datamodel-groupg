import { IInvention } from "../interfaces/IInvention.js";

/**
 * Model that represents an invention or scientific artifact.
 */
export class Invention implements IInvention {
  private _id: string;
  private _name: string;
  private _description: string;
  private _inventorId: string;
  private _type: string;
  private _dangerLevel: number;

  constructor(
    id: string,
    name: string,
    description: string,
    inventorId: string,
    type: string,
    dangerLevel: number
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._inventorId = inventorId;
    this._type = type;
    this._dangerLevel = dangerLevel;
  }

  /** Invention id */
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  /** Name of the invention */
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  /** Description of the invention */
  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }

  /** ID of the character who invented this invention */
  get inventorId(): string {
    return this._inventorId;
  }
  set inventorId(value: string) {
    this._inventorId = value;
  }

  /** Type of invention */
  get type(): string {
    return this._type;
  }
  set type(value: string) {
    this._type = value;
  }

  /** Danger level */
  get dangerLevel(): number {
    return this._dangerLevel;
  }
  set dangerLevel(value: number) {
    if (value < 1 || value > 10) {
      throw new Error("Danger level must be between 1 and 10.");
    }
    this._dangerLevel = value;
  }
}
