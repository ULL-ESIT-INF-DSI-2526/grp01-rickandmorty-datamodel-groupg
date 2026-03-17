/**
 * Interface for entity CRUD handlers to use CLI 
 */
export interface IHandler {
	/**
	 * Method to add an object in the database
	 */
  handleAdd(): Promise<void>;

	/**
	 * Method to modify an object of the database
	 * @param id the id of the object to modify
	 */
  handleModify(id: string): Promise<void>;

	/**
	 *  Methid to eliminate an object of the database
	 * @param id the id of the object to eliminate
	 */
	handleDelete(id: string): Promise<void>;
}