import prompts from "prompts";
import { IHandler } from "../../interfaces/IHandler.js";
import { DbManager } from "../../database/DbManager.js";
import { Character } from "../../models/Character.js";

/**
 * class that implements IHandler to manage CRUD operations of the characters
 */
export class CharacterHandler implements IHandler {
  constructor(private readonly db: DbManager) {}
  /**
   * Method to add a character in the database
   */
  async handleAdd(): Promise<void> {
    const data = await prompts([
      { type: "text", name: "id", message: "ID:" },
      { type: "text", name: "name", message: "Name:" },
      { type: "text", name: "description", message: "Description:" },
      { type: "text", name: "speciesId", message: "Species ID:" },
      { type: "text", name: "dimensionId", message: "Origin Dimension ID:" },
      { type: "text", name: "currentDimension", message: "Current Dimension ID:"},
      { type: "text", name: "status", message: "Status:" },
      { type: "text", name: "affiliation", message: "Affiliation:" },
      { type: "number", name: "intelligence", message: "Intelligence (1-10):" },
    ]);

    if(data.intelligence < 1 || data.intelligence > 10){
      throw new Error("Not a range in the inteligence");
    }
    
    if (!this.db.species.getById(data.speciesId)) {
      throw new Error("Species ID not found");
    }
    if (!this.db.dimensions.getById(data.dimensionId)) {
      throw new Error("Dimension ID not found");
    }

    this.db.characters.add(
      new Character(
        data.id,
        data.name,
        data.description,
        data.speciesId,
        data.dimensionId,
        data.currentDimension,
        data.status,
        data.affiliation,
        data.intelligence,
      ),
    );
  }

  /**
   * Method to modify a character of the database
   * @param id Id of the character to modify
   */
  async handleModify(id: string): Promise<void> {
    const entity = this.db.characters.getById(id);
    if (!entity) throw new Error("Character not found");

    const { field } = await prompts({
      type: "select",
      name: "field",
      message: "Field to modify:",
      choices: [
        { title: "ID", value: "ID" },
        { title: "Name", value: "name" },
        { title: "Description", value: "description" },
        { title: "Species ID", value: "speciesId" },
        { title: "Dimension ID", value: "originDimensionId" },
        { title: "Intelligence", value: "intelligence" },
      ],
    });

    const { newValue } = await prompts({
      type: field === "intelligence" ? "number" : "text",
      name: "newValue",
      message: "Enter new value:",
    });

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
      case "speciesId":
        entity.speciesId = newValue;
      case "originDimensionId":
        entity.originDimensionId = newValue;
      case "intelligence":
        entity.intelligence = newValue;

      default:
        break;
    }
  }

  /**
   * Method to delete a character of the database
   * @param id
   */
  async handleDelete(id: string): Promise<void> {
    this.db.characters.remove(id);
  }

  /**
   *  Auxiliar function to validate the IDs of the characters
   * @param field the selection of the user
   * @param newValue the new ID value of the user
   */
  validate(field: string, newValue: string): void {
    if (field === "ID" && this.db.characters.getById(newValue)) {
      throw new Error("Another character has this ID");
    }

    if (field === "speciesId" && !this.db.species.getById(newValue)) {
      throw new Error("Species not found");
    }
    if (
      field === "originDimensionId" &&
      !this.db.dimensions.getById(newValue)
    ) {
      throw new Error("Dimension not found");
    }
  }
}
