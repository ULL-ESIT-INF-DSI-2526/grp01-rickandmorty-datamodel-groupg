/**
 * Represents a structured multiverse event.
 * Used to expose event information in a consistent format.
 */
export interface IMultiverseEvent {
  timestamp: string;
  type: "TRAVEL" | "DIMENSION_CHANGE" | "INVENTION_DEPLOY";
  description: string;
  subjectId: string;
}
