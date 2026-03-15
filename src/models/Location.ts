import { ILocation } from "../interfaces/ILocation.js";

/**
 * Domain model representing a location or planet in the multiverse.
 */
export class Location implements ILocation {
  private _id: string;
  private _name: string;
  private _description: string;
  private _type: string;
  private _dimensionId: string;
  private _population: number;

  constructor(
    id: string,
    name: string,
    description: string,
    type: string,
    dimensionId: string,
    population: number
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._type = type;
    this._dimensionId = dimensionId;
    this._population = population;
  }

  /** Unique identifier */
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  /** Name of the location */
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  /** Description of the location */
  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }

  /** Type of location (Planet, Space Station, etc.) */
  get type(): string {
    return this._type;
  }
  set type(value: string) {
    this._type = value;
  }

  /** ID of the dimension where this location exists */
  get dimensionId(): string {
    return this._dimensionId;
  }
  set dimensionId(value: string) {
    this._dimensionId = value;
  }

  /** Approximate population */
  get population(): number {
    return this._population;
  }
  set population(value: number) {
    if (value < 0) {
      throw new Error("Population cannot be negative.");
    }
    this._population = value;
  }
}
