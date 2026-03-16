import prompts from "prompts";
import { DbManager } from "../database/DbManager.js";
import { SearchEngine } from "../services/SearchEngine.js";
import { MultiverseManager } from "../services/MultiverseManager.js";
import { Character } from "../models/Character.js";

/**
 * @type type that defines the possible responses of the entityMenu
 */
type EntityMenu = 'characters' | 'dimensions' | 'species' | 'locations' | 'inventions';

/**
 * @type type that defines the possible responses of the MainOption
 */
type MainOption = 'char' | 'dim' | 'spec' | 'loc' | 'inv' | 'events' | 'search' | 'reports' | 'exit';

/**
 * @class A class that defines the vital functions for creating an interactive menu using console prompts.
 */
export class CLI {
  private readonly search: SearchEngine;
  private readonly manager: MultiverseManager;

  constructor(private readonly db: DbManager) {
    this.search = new SearchEngine(db);
    this.manager = new MultiverseManager(db);
  }

  /** 
   * Starts the CLI loop 
   */
  public async run(): Promise<void> {
    let exit = false;
    while (!exit) {
      console.clear();
      console.log("=== RICK & MORTY MULTIVERSE CLI ===");
      
      const response = await prompts({
        type: 'select',
        name: 'main',
        message: 'What do you want to manage?',
        choices: [
          { title: 'Characters', value: 'char' },
          { title: 'Dimensions', value: 'dim' },
          { title: 'Species', value: 'spec' },
          { title: 'Locations', value: 'loc' },
          { title: 'Inventions', value: 'inv' },
          { title: 'Multiverse Events', value: 'events' },
          { title: 'Advanced Search', value: 'search' },
          { title: 'Global Reports', value: 'reports' },
          { title: 'Exit', value: 'exit' }
        ]
      });

      const choice = response.main as MainOption;
      if (choice === 'exit' || !choice){
         exit = true;
      }else{
        await this.handleSelection(choice);
      }
    }
  }

  private async handleSelection(choice: MainOption): Promise<void> {
    switch (choice) {
      case 'char': await this.crudMenu('characters'); break;
      case 'dim': await this.crudMenu('dimensions'); break;
      case 'spec': await this.crudMenu('species'); break;
      case 'loc': await this.crudMenu('locations'); break;
      case 'inv': await this.crudMenu('inventions'); break;
      case 'events': await this.eventsMenu(); break;
      case 'search': await this.searchMenu(); break;
      case 'reports': await this.reportsMenu(); break;
    }
  }

  private async crudMenu(menu: EntityMenu): Promise<void> {
    const { op } = await prompts({
      type: 'select',
      name: 'op',
      message: `${menu.toUpperCase()} Operations:`,
      choices: [
        { title: 'List All', value: 'list' },
        { title: 'Add New', value: 'add' },
        { title: 'Modify', value: 'mod' },
        { title: 'Delete', value: 'del' },
        { title: 'Back', value: 'back' }
      ]
    });

    if (op === 'list') console.table(this.db[menu].getAll());
    if (op === 'del') await this.handleDelete(menu);
    if (op === 'add') await this.handleAdd(menu);
    if (op === 'mod') await this.handleModify(menu);

    if (op && op !== 'back') await prompts({ type: 'text', name: 'p', message: 'Press enter...' });
  }

  private async handleDelete(menu: EntityMenu): Promise<void> {
    const { id } = await prompts({ type: 'text', name: 'id', message: 'Enter ID to remove:' });
    if (id) {
      this.db[menu].remove(id);
      await this.db.save();
      console.log("Successfully removed.");
    }
  }

  private async handleAdd(menu: EntityMenu): Promise<void> {
    console.log(`Adding to ${menu}...`);
    if (menu === 'characters') {
      const data = await prompts([
        { type: 'text', name: 'id', message: 'ID:' },
        { type: 'text', name: 'name', message: 'Name:' },
        { type: 'number', name: 'intel', message: 'Intelligence (1-10):' }
      ]);
      const char = new Character(data.id, data.name, "N/A", "s1", "d1", "Alive", "None", data.intel);
      this.db.characters.add(char);
    }
    await this.db.save();
  }

  private async handleModify(menu: EntityMenu): Promise<void> {
    const { id } = await prompts({ type: 'text', name: 'id', message: 'ID to modify:' });
    const entity = this.db[menu].getById(id);
    if (!entity) {
      console.log("Entity not found.");
      return;
    }
    const { newName } = await prompts({ type: 'text', name: 'newName', message: `New Name (current: ${entity.name}):` });
    if (newName) entity.name = newName;
    await this.db.save();
  }

  private async eventsMenu(): Promise<void> {
    const { action } = await prompts({
      type: 'select',
      name: 'action',
      message: 'Multiverse Events:',
      choices: [
        { title: 'Register Travel', value: 'travel' },
        { title: 'Back', value: 'back' }
      ]
    });

    if (action === 'travel') {
      const r = await prompts([
        { type: 'text', name: 'c', message: 'Char ID:' },
        { type: 'text', name: 'd', message: 'Dest Dim ID:' },
        { type: 'text', name: 'r', message: 'Reason:' }
      ]);
      await this.manager.registerTravel(r.c, r.d, r.r);
    }
    if (action !== 'back') await prompts({ type: 'text', name: 'p', message: 'Press enter...' });
  }

  private async searchMenu(): Promise<void> {
    const { n } = await prompts({ type: 'text', name: 'n', message: 'Search versions of character by name:' });
    if (n) console.table(this.search.findAlternativeVersions(n));
    await prompts({ type: 'text', name: 'p', message: 'Press enter...' });
  }

  private async reportsMenu(): Promise<void> {
    console.log("Multiverse Reports:");
    console.table(this.manager.getVersionAnalytics());
    await prompts({ type: 'text', name: 'p', message: 'Press enter...' });
  }
}