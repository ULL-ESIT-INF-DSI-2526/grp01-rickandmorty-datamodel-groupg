import { DimensionStatus, IDimension } from "../interfaces/IDimension.js";

/**
 * Domain model representing a dimension in the multiverse.
 */
export class Dimension implements IDimension {
  private _id: string;
  private _name: string;
  private _description: string;
  private _status: DimensionStatus;
  private _techLevel: number;

  constructor(
    id: string,
    name: string,
    description: string,
    status: DimensionStatus,
    techLevel: number,
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._status = status;
    this._techLevel = techLevel;
  }

  /** Unique identifier */
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  /** Human-readable name */
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  /** Description of the dimension */
  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }

  /** Current state of the dimension */
  get status(): DimensionStatus {
    return this._status;
  }
  set status(value: DimensionStatus) {
    this._status = value;
  }

  /** Technological level (1–10) */
  get techLevel(): number {
    return this._techLevel;
  }
  set techLevel(value: number) {
    if (value < 1 || value > 10) {
      throw new Error("Tech level must be between 1 and 10.");
    }
    this._techLevel = value;
  }
}
