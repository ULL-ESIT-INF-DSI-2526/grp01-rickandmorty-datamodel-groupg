import prompts from "prompts";
import { IHandler } from "../../interfaces/IHandler.js";
import { DbManager } from "../../database/DbManager.js";
import { Dimension } from "../../models/Dimension.js";

/**
 * class that implements IHandler to manage CRUD operations of the dimensions
 */
export class DimensionHandler implements IHandler {
  constructor(private readonly db: DbManager) {}

  /**
   * Method to add a dimension in the database
   */
  async handleAdd(): Promise<void> {
    const data = await prompts([
      { type: "text", name: "id", message: "ID:" },
      { type: "text", name: "name", message: "Name:" },
      { type: "text", name: "description", message: "Description:" },
      { type: "text", name: "status", message: "Status (Active/Destroyed):" },
      { type: "number", name: "techLevel", message: "Tech Level (1-10):" },
    ]);
    this.db.dimensions.add(
      new Dimension(
        data.id,
        data.name,
        data.description,
        data.status,
        data.techLevel,
      ),
    );
  }
  /**
   * Method to modify a dimension of the database
   * @param id Id of the dimension to modify
   */
  async handleModify(id: string): Promise<void> {
    const entity = this.db.dimensions.getById(id);
    if (!entity) throw new Error("Dimension not found");

    const { field } = await prompts({
      type: "select",
      name: "field",
      message: "Field to modify:",
      choices: [
        { title: "ID", value: "ID" },
        { title: "Description", value: "Description" },
        { title: "Name", value: "name" },
        { title: "Status", value: "status" },
        { title: "Tech Level", value: "techLevel" },
      ],
    });

    const { newValue } = await prompts({
      type: field === "techLevel" ? "number" : "text",
      name: "newValue",
      message: "Enter new value:",
    });

    this.validate(field, newValue);

    switch (field) {
      case "ID":
        entity.id = newValue;
        break;
      case "Description":
        entity.description = newValue;
        break;
      case "name":
        entity.name = newValue;
        break;
      case "status":
        entity.status = newValue;
        break;
      case "techLevel":
        entity.techLevel = newValue;
        break;

      default:
        break;
    }
  }

  /**
   * Method to delete a dimension of the database
   * @param id
   */
  async handleDelete(id: string): Promise<void> {
    this.db.dimensions.remove(id);
  }

  /**
   * Auxiliar function to validate the IDs of the dimensions
   * @param field the selection of the user
   * @param newValue the new ID value of the user
   */
  validate(field: string, newValue: string): void {
    if (field === "ID" && this.db.dimensions.getById(newValue)) {
      throw new Error("Another dimension has this ID");
    }
  }
}
