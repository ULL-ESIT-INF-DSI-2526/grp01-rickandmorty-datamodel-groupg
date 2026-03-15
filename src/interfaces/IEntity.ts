/**
 * Base interface implemented by all domain entities.
 * Provides a unique identifier, a name, and a description.
 */
export interface IEntity {
  /** Unique identifier of the entity */
  id: string;

  /** Human-readable name of the entity */
  name: string;

  /** Short description of the entity */
  description: string;
}
