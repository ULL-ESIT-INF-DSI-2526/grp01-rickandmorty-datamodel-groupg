import prompts from "prompts";
import { DbManager } from "../database/DbManager.js";
import { SearchEngine } from "../services/SearchEngine.js";
import { MultiverseManager } from "../services/MultiverseManager.js";
import { EntityMenu, MainOption } from "./types.js";
import { IHandler } from "../interfaces/IHandler.js";
import { CharacterHandler } from "./handlers/CharacterHandler.js";
import { DimensionHandler } from "./handlers/DimensionHandler.js";
import { SpeciesHandler } from "./handlers/SpeciesHandler.js";
import { LocationHandler } from "./handlers/LocationHandler.js";
import { InventionHandler } from "./handlers/InventionHandler.js";

/**
 * Class that manages the interactive command interface with the user through prompts
 */
export class CLI {
  private readonly handlers: Record<EntityMenu, IHandler>;

  constructor(
    private readonly db: DbManager,
    private readonly search: SearchEngine,
    private readonly manager: MultiverseManager,
  ) {
    this.handlers = {
      characters: new CharacterHandler(db),
      dimensions: new DimensionHandler(db),
      species: new SpeciesHandler(db),
      locations: new LocationHandler(db),
      inventions: new InventionHandler(db),
    };
  }

  /**
   * Principal method to run the logic of the CLI
   * show the first selection 
   */
  public async run(): Promise<void> {
    let exit = false;
    while (!exit) {
      console.clear();
      console.log("=== RICK & MORTY MULTIVERSE CLI ===");
      const response = await prompts({
        type: "select",
        name: "main",
        message: "What do you want to manage?",
        choices: [
          { title: "Characters", value: "char" },
          { title: "Dimensions", value: "dim" },
          { title: "Species", value: "spec" },
          { title: "Locations", value: "loc" },
          { title: "Inventions", value: "inv" },
          { title: "Advanced Search", value: "search" },
          { title: "Multiverse Events", value: "events" },
          { title: "Global Reports", value: "reports" },
          { title: "Exit", value: "exit" },
        ],
      });

      const choice = response.main as MainOption;
      if (choice === "exit" || !choice) {
        exit = true;
      } else {
        await this.handleSelection(choice);
      }
    }
  }

  /**
   * method that manages the choise of the first selection 
   * @param choice choice of the first selection
   */
  private async handleSelection(choice: MainOption): Promise<void> {
    switch (choice) {
      case "char":
        await this.crudMenu("characters");
        break;
      case "dim":
        await this.crudMenu("dimensions");
        break;
      case "spec":
        await this.crudMenu("species");
        break;
      case "loc":
        await this.crudMenu("locations");
        break;
      case "inv":
        await this.crudMenu("inventions");
        break;

    }
  }

  /**
   * Method that maneges the selection of the CRUD option 
   * @param menu type of object that we have to do CRUD operation 
   */
  private async crudMenu(menu: EntityMenu): Promise<void> {
    const { op } = await prompts({
      type: "select",
      name: "op",
      message: `${menu.toUpperCase()} Operations:`,
      choices: [
        { title: "List All", value: "list" },
        { title: "Add New", value: "add" },
        { title: "Modify", value: "mod" },
        { title: "Delete", value: "del" },
        { title: "Back", value: "back" },
      ],
    });

    const handler = this.handlers[menu];

    try {
      switch (op) {
        case "list":
          console.table(this.db[menu].getAll());
          break;
        case "add":
          await handler.handleAdd();
          await this.db.save();
          console.log("Operation successful.");
          break;
        case "mod":
          const { id } = await prompts({
            type: "text",
            name: "id",
            message: "Enter ID to modify:",
          });
          await handler.handleModify(id);
          await this.db.save();
          console.log("Update successful.");
          break;
        case "del":
          const { delId } = await prompts({
            type: "text",
            name: "delId",
            message: "Enter ID to remove:",
          });
          await handler.handleDelete(delId);
          await this.db.save();
          console.log("Successfully removed.");
          break;
      }
    } catch (error) {
      console.log("Error: " + (error as Error).message);
    }

    if (op && op !== "back")
      await prompts({
        type: "text",
        name: "p",
        message: "Press enter to continue...",
      });
  }


}
