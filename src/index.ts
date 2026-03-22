import { DbManager } from "./database/DbManager.js";
import { SearchEngine } from "./services/SearchEngine.js";
import { MultiverseManager } from "./services/MultiverseManager.js";
import { SearchHandler } from "./ui/handlers/SearchHandler.js";
import { CLI } from "./ui/CLI.js";
import { EventsHandler } from "./ui/handlers/EventsHandler.js";
import { ReportHandler } from "./ui/handlers/ReportHandler.js";

/**
 * Main application entry point
 * Initializes the database, services, and the command-line interface
 */
async function main() {

  const db = new DbManager();
  
  try {
    await db.load();
    
    const search = new SearchEngine(db);
    const manager = new MultiverseManager(db);

    const searUI = new SearchHandler(search);
    const eventUI = new EventsHandler(manager);
    const reportUI = new ReportHandler(manager);
    
    const ui = new CLI(db, searUI, eventUI, reportUI);
    await ui.run();
    
  } catch (error) {
    console.error("Critical Failure during application startup:", error);
    process.exit(1);
  }
}

main();