/**
 * Base interface implemented by all domain entities.
 */
export interface IEntity {
  /** ID of the entity */
  id: string;

  /** Name of the entity */
  name: string;

  /** Description of the entity */
  description: string;
}
