/**
 * Represents a generic activity record in the multiverse.
 * Can represent a travel or an event.
 */
export interface IAppRecord {
  /** Unique identifier of the record */
  id: string;

  /** Type of record */
  type: "travel" | "event";

  /** Timestamp in milliseconds */
  timestamp: number;

  /** Description of the activity */
  description: string;
}
