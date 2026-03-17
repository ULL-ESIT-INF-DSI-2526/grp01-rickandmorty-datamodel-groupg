import { DbManager } from "./database/DbManager.js";
import { SearchEngine } from "./services/SearchEngine.js";
import { MultiverseManager } from "./services/MultiverseManager.js";
import { CLI } from "./ui/CLI.js";

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
    
    const ui = new CLI(db, search, manager);
    await ui.run();
    
  } catch (error) {
    console.error("Critical Failure during application startup:", error);
    process.exit(1);
  }
}

// Start the execution
main();