import { ISpecies } from "../interfaces/ISpecies.js";

/**
 * Domain model representing a biological species.
 */
export class Species implements ISpecies {
  private _id: string;
  private _name: string;
  private _description: string;
  private _origin: string;
  private _type: string;
  private _averageLifespan: number;

  constructor(
    id: string,
    name: string,
    description: string,
    origin: string,
    type: string,
    averageLifespan: number
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._origin = origin;
    this._type = type;
    this._averageLifespan = averageLifespan;
  }

  /** Unique identifier */
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  /** Name of the species */
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  /** Description of the species */
  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }

  /** Planet or dimension where the species originated */
  get origin(): string {
    return this._origin;
  }
  set origin(value: string) {
    this._origin = value;
  }

  /** Biological classification (Humanoid, Robotic, etc.) */
  get type(): string {
    return this._type;
  }
  set type(value: string) {
    this._type = value;
  }

  /** Average lifespan in Earth years */
  get averageLifespan(): number {
    return this._averageLifespan;
  }
  set averageLifespan(value: number) {
    if (value <= 0) {
      throw new Error("Average lifespan must be positive.");
    }
    this._averageLifespan = value;
  }
}
