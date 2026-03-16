import { DbManager } from "./database/DbManager.js";
import { CLI } from "./ui/CLI.js";

/**
 * Main application entry point.
 */
async function main() {
  const db = new DbManager();
  
  try {
    // 1. Initialize Database
    await db.load();
    
    // 2. Start Interface
    const ui = new CLI(db);
    await ui.run();
    
  } catch (error) {
    console.error("Critical Failure:", error);
    process.exit(1);
  }
}

main();