/**
 * Interface for entity CRUD handlers to use CLI 
 */
export interface IHandler {
	/**
	 * Method to add something to the database
	 */
  handleAdd(): Promise<void>;

	/**
	 * Method to modify something of the database
	 * @param id 
	 */
  handleModify(id: string): Promise<void>;
}