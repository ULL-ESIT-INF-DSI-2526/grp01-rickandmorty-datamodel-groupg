import prompts from "prompts";
import { IHandler } from "../../interfaces/IHandler.js";
import { DbManager } from "../../database/DbManager.js";
import { Location } from "../../models/Location.js";

/**
 * class that implements IHandler to manage CRUD operations of the locations
 */

export class LocationHandler implements IHandler {
  constructor(private readonly db: DbManager) {}

  /**
   * Method to add a location in the database
   */
  async handleAdd(): Promise<void> {
    const data = await prompts([
      { type: "text", name: "id", message: "ID:" },
      { type: "text", name: "name", message: "Name:" },
      { type: "text", name: "description", message: "Description:" },
      { type: "text", name: "type", message: "Type (Planet/Station):" },
      { type: "text", name: "dimensionId", message: "Dimension ID:" },
      { type: "number", name: "population", message: "Population:" },
    ]);

    if (!this.db.dimensions.getById(data.dimensionId))
      throw new Error("Dimension ID not found");

    this.db.locations.add(
      new Location(
        data.id,
        data.name,
        data.description,
        data.type,
        data.dimensionId,
        data.population,
      ),
    );
  }
  /**
   * Method to modify a location of the database
   * @param id Id of the location to modify
   */
  async handleModify(id: string): Promise<void> {
    const entity = this.db.locations.getById(id);
    if (!entity) throw new Error("Location not found");

    const { field } = await prompts({
      type: "select",
      name: "field",
      message: "Select field to modify:",
      choices: [
        { title: "ID", value: "ID" },
        { title: "Name", value: "name" },
        { title: "Description", value: "description" },
        { title: "Type", value: "type" },
        { title: "Dimension ID", value: "dimensionId" },
        { title: "Population", value: "population" },
      ],
    });

    const { newValue } = await prompts({
      type: field === "population" ? "number" : "text",
      name: "newValue",
      message: `Enter new value for ${field}:`,
    });

    if (newValue === undefined) return;
    this.validate(field, newValue);

    switch (field) {
      case "ID":
        entity.id = newValue;
        break;
      case "description":
        entity.description = newValue;
        break;
      case "type":
        entity.type = newValue;
        break;
      case "dimensionId":
        entity.dimensionId = newValue;
        break;
      case "population":
        entity.population = newValue;
        break;
      default:
        break;
    }
  }

  /**
   * Method to delete a location of the database
   * @param id
   */
  async handleDelete(id: string): Promise<void> {
    this.db.locations.remove(id);
  }

  /**
   * Auxiliar function to validate the IDs of the locations
   * @param field the selection of the user
   * @param newValue the new ID value of the user
   */
  validate(field: string, newValue: string): void {
    if (field === "ID" && this.db.locations.getById(newValue)) {
      throw new Error("Another location has this ID");
    }
    if (field === "dimensionId" && !this.db.dimensions.getById(newValue)) {
      throw new Error("Dimension not found");
    }
  }
}
