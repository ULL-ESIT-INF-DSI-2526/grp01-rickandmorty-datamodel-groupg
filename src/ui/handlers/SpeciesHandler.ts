import prompts from "prompts";
import { IHandler } from "../../interfaces/IHandler.js";
import { DbManager } from "../../database/DbManager.js";
import { Species } from "../../models/Species.js";

/**
 * class that implements IHandler to manage CRUD operations of the species
 */
export class SpeciesHandler implements IHandler {
  constructor(private readonly db: DbManager) {}

  /**
   * Method to add a specie in the database
   */
  
  async handleAdd(): Promise<void> {
    const data = await prompts([
      { type: "text", name: "id", message: "ID:" },
      { type: "text", name: "name", message: "Name:" },
      { type: "text", name: "description", message: "Description:" },
      { type: "text", name: "origin", message: "Origin (Planet/Dimension):" },
      { type: "text", name: "type", message: "Biological Type:" },
      { type: "number", name: "lifespan", message: "Average Lifespan:" },
    ]);

    this.db.species.add(
      new Species(
        data.id,
        data.name,
        data.description,
        data.origin,
        data.type,
        data.lifespan,
      ),
    );
  }

  /**
   * Method to modify a specie of the database
   * @param id Id of the specie to modify
   */
  async handleModify(id: string): Promise<void> {
    const entity = this.db.species.getById(id);
    if (!entity) throw new Error("Species not found");

    const { field } = await prompts({
      type: "select",
      name: "field",
      message: "Select field to modify:",
      choices: [
        { title: "ID", value: "ID" },
        { title: "Name", value: "name" },
        { title: "Description", value: "description" },
        { title: "Origin", value: "origin" },
        { title: "Type", value: "type" },
        { title: "Lifespan", value: "averageLifespan" },
      ],
    });

    const { newValue } = await prompts({
      type: field === "averageLifespan" ? "number" : "text",
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
      case "origin":
        entity.origin = newValue;
        break;
      case "type":
        entity.type = newValue;
        break;
      case "averageLifespan":
        entity.averageLifespan = newValue;
        break;
      default:
        break;
    }
  }

  /**
   * Method to delete a specie of the database
   * @param id
   */
  async handleDelete(id: string): Promise<void> {
    this.db.species.remove(id);
  }

  /**
   * Auxiliar function to validate the IDs of the species
   * @param field the selection of the user
   * @param newValue the new ID value of the user
   */
  validate(field: string, newValue: string): void {
    if (field === "ID" && this.db.species.getById(newValue)) {
      throw new Error("Another specie has this ID");
    }
  }
}
