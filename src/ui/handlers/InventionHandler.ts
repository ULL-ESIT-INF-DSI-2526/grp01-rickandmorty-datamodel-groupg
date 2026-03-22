import prompts from "prompts";
import { IHandler } from "../../interfaces/IHandler.js";
import { DbManager } from "../../database/DbManager.js";
import { Invention } from "../../models/Invention.js";

/**
 * class that implements IHandler to manage CRUD operations of the inventions
 */

export class InventionHandler implements IHandler {
  constructor(private readonly db: DbManager) {}
  /**
   * Method to add a invention in the database
   */
  async handleAdd(): Promise<void> {
    const data = await prompts([
      { type: "text", name: "id", message: "ID:" },
      { type: "text", name: "name", message: "Name:" },
      { type: "text", name: "description", message: "Description:" },
      { type: "text", name: "inventorId", message: "Inventor (Character ID):" },
      { type: "text", name: "type", message: "Type:" },
      { type: "number", name: "dangerLevel", message: "Danger Level (1-10):" },
    ]);

    if (!this.db.characters.getById(data.inventorId))
      throw new Error("Inventor Character ID not found");

    this.db.inventions.add(
      new Invention(
        data.id,
        data.name,
        data.description,
        data.inventorId,
        data.type,
        data.dangerLevel,
      ),
    );
  }
  /**
   * Method to modify a invention of the database
   * @param id Id of the invention to modify
   */
  async handleModify(id: string): Promise<void> {
    const entity = this.db.inventions.getById(id);
    if (!entity) throw new Error("Invention not found");

    const { field } = await prompts({
      type: "select",
      name: "field",
      message: "Select field to modify:",
      choices: [
        { title: "ID", value: "name" },
        { title: "Name", value: "name" },
        { title: "Description", value: "description" },
        { title: "Inventor ID", value: "inventorId" },
        { title: "Type", value: "type" },
        { title: "Danger Level", value: "dangerLevel" },
      ],
    });

    const { newValue } = await prompts({
      type: field === "dangerLevel" ? "number" : "text",
      name: "newValue",
      message: `Enter new value for ${field}:`,
    });

    if (newValue === undefined) return;
    this.validate(field, newValue);

    switch (field) {
      case "ID":
        entity.id = newValue;
        break;
      case "name":
        entity.name = newValue;
        break;
      case "description":
        entity.description = newValue;
        break;
      case "inventorId":
        entity.inventorId = newValue;
        break;
      case "type":
        entity.type = newValue;
        break;
      case "dangerLevel":
        entity.dangerLevel = newValue;
        break;
      default:
        break;
    }
  }

  /**
   * Method to delete a invention of the database
   * @param id
   */
  async handleDelete(id: string): Promise<void> {
    this.db.inventions.remove(id);
  }

  /**
   * Auxiliar function to validate the IDs of the invention
   * @param field the selection of the user
   * @param newValue the new ID value of the user
   */
  validate(field: string, newValue: string): void {
    if (field === "ID" && this.db.inventions.getById(newValue)) {
      throw new Error("Another invention has this ID");
    }
    if (field === "inventorId" && !this.db.characters.getById(newValue)) {
      throw new Error("Inventor not found");
    }
  }
}
