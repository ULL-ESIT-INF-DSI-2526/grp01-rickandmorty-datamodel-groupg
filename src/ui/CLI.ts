import prompts from "prompts";
import { DbManager } from "../database/DbManager.js";
import { SearchEngine } from "../services/SearchEngine.js";
import { MultiverseManager } from "../services/MultiverseManager.js";

/**
 * Command Line Interface for interacting with the Rick & Morty Multiverse system.
 */
export class CLI {
  private searchEngine: SearchEngine;
  private multiverse: MultiverseManager;

  constructor(private db: DbManager) {
    this.searchEngine = new SearchEngine(db);
    this.multiverse = new MultiverseManager(db);
  }

  /**
   * Starts the main interactive loop.
   */
  public async run(): Promise<void> {
    console.clear();
    console.log("RICK & MORTY MULTIVERSE MANAGEMENT SYSTEM v1.0");

    let exit = false;
    while (!exit) {
      const choice = await prompts({
        type: "select",
        name: "action",
        message: "Main Menu - Select an option:",
        choices: [
          { title: "Manage Characters", value: "characters" },
          { title: "Manage Dimensions", value: "dimensions" },
          { title: "Search & Advanced Filters", value: "search" },
          { title: "Multiverse Reports", value: "reports" },
          { title: "Exit", value: "exit" },
        ],
      });

      if (choice.action === "exit") {
        exit = true;
        console.log("Wubba Lubba Dub Dub! See you, Rick.");
      } else {
        await this.handleSubMenu(choice.action);
      }
    }
  }

  private async handleSubMenu(menu: string): Promise<void> {
    switch (menu) {
      case "characters":
        await this.showCharacterMenu();
        break;
      case "reports":
        await this.showReportsMenu();
        break;
      case "search":
        await this.showSearchMenu();
        break;
      default:
        console.log("Feature coming soon...");
    }
  }

  /**
   * Logic for character management.
   */
  private async showCharacterMenu(): Promise<void> {
    const action = await prompts({
      type: "select",
      name: "value",
      message: "Character Management:",
      choices: [
        { title: "List All Characters", value: "list" },
        { title: "Register Interdimensional Travel", value: "travel" },
        { title: "Back", value: "back" },
      ],
    });

    if (action.value === "list") {
      console.table(this.db.characters.getAll());
    } else if (action.value === "travel") {
      await this.handleTravelPrompt();
    }
  }

  /**
   * Prompts user for travel data and executes it through the MultiverseManager.
   */
  private async handleTravelPrompt(): Promise<void> {
    const data = await prompts([
      { type: "text", name: "charId", message: "Enter Character ID:" },
      { type: "text", name: "dimId", message: "Enter Target Dimension ID:" },
    ]);

    try {
      await this.multiverse.performTravel(data.charId, data.dimId);
      console.log("Travel recorded successfully.");
    } catch (err) {
      console.error(`Error: ${(err as Error).message}`);
    }
  }

  private async showReportsMenu(): Promise<void> {
    console.log("\n--- Active Dimensions Tech Report ---");
    console.table(this.multiverse.getActiveDimensionsReport());
  }

  private async showSearchMenu(): Promise<void> {
    const { name } = await prompts({
      type: "text",
      name: "name",
      message: "Enter character name to find all versions:",
    });

    const results = this.searchEngine.findAlternativeVersions(name);
    if (results.length > 0) {
      console.table(results);
    } else {
      console.log("No versions found for that name.");
    }
  }
}