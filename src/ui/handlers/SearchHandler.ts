import prompts from "prompts";
import { SearchEngine } from "../../services/SearchEngine.js";

/**
 * @class SearchHandler
 * SearchHandler specialized in managing the search interface and prompts from CLI
 */
export class SearchHandler {
  constructor(private readonly search: SearchEngine) {}

  /**
   * Method that show the main menu of advanced searches within the CLI
   */
  public async showMenu(): Promise<void> {
    const { type } = await prompts({
      type: "select",
      name: "type",
      message: "Search Category:",
      choices: [
        { title: "Alternative Versions", value: "versions" },
        { title: "Characters", value: "char" },
        { title: "Dimensions", value: "dim" },
        { title: "Locations", value: "loc" },
        { title: "Inventions", value: "inv" },
        { title: "Back", value: "back" },
      ],
    });

    if (type === "back" || !type) {
      return;
    }

    await this.handleSearchType(type);

    await prompts({
      type: "text",
      name: "p",
      message: "Press enter to continue...",
    });
  }

  /**
   * method that handles the filter according to the type of search selected
   * @param type typo of search selected in the last menu
   */
  private async handleSearchType(type: string): Promise<void> {
    switch (type) {
      case "char":
        await this.filterCharacters();
        break;
      case "versions":
        await this.filterAlternativeVersions();
        break;
      case "dim":
        await this.filterDimensions();
        break;
      case "loc":
        await this.filterLocations();
        break;
      case "inv":
        await this.filterInventions();
        break;
    }
  }

  /**
   * Method responsible for collecting the parameters to filter a character and printing the filter result
   */
  private async filterCharacters(): Promise<void> {
    const filters = await prompts([
      { type: "text", name: "name", message: "Name:" },
      { type: "text", name: "speciesId", message: "Species ID:" },
      { type: "text", name: "status", message: "Status:" },
      {
        type: "select",
        name: "sort",
        message: "Sort by:",
        choices: [
          { title: "Name", value: "name" },
          { title: "Intelligence", value: "intelligence" },
        ],
      },
      {
        type: "toggle",
        name: "desc",
        message: "Order:",
        initial: false,
        active: "Descending",
        inactive: "Ascending",
      },
    ]);

    console.table(
      this.search.searchCharacters(
        {
          name: filters.name || undefined,
          speciesId: filters.speciesId || undefined,
          status: filters.status || undefined,
        },
        filters.sort,
        filters.desc,
      ),
    );
  }
  /**
   * Method responsible for collecting the parameters to filter a character whit alternative version and printing the filter result
   */
  private async filterAlternativeVersions(): Promise<void> {
    const { characterName } = await prompts({
      type: "text",
      name: "characterName",
      message: "Character Name:",
    });
    if (characterName) {
      console.table(this.search.findAlternativeVersions(characterName));
    }
  }

  /**
   * Method responsible for collecting the parameters to filter a dimension and printing the filter result
   */
  private async filterDimensions(): Promise<void> {
    const filters = await prompts([
      { type: "text", name: "name", message: "Dimension Name:" },
      { type: "text", name: "status", message: "Status:" },
      { type: "number", name: "techLevel", message: "Tech Level:" },
    ]);
    const techLevelValue =
      typeof filters.techLevel === "number" ? filters.techLevel : undefined;
    console.table(
      this.search.searchDimensions(
        filters.name || undefined,
        filters.status || undefined,
        techLevelValue,
      ),
    );
  }

  /**
   * Method responsible for collecting the parameters to filter a location and printing the filter result
   */
  private async filterLocations(): Promise<void> {
    const filters = await prompts([
      { type: "text", name: "name", message: "Location Name:" },
      { type: "text", name: "type", message: "Type:" },
      { type: "text", name: "dimensionId", message: "Dimension ID:" },
      { type: "number", name: "population", message: "Population:" },
    ]);
    console.table(
      this.search.searchLocations(
        filters.name || undefined,
        filters.type || undefined,
        filters.dimensionId || undefined,
        filters.population ||undefined
      ),
    );
  }

  /**
   * Method responsible for collecting the parameters to filter a invention and printing the filter result
   */
  private async filterInventions(): Promise<void> {
    const filters = await prompts([
      { type: "text", name: "name", message: "Invention name:" },
      { type: "text", name: "typeInv", message: "Type:" },
      { type: "text", name: "inventorID", message: "Inventor ID:" },
      { type: "number", name: "dangerLevel", message: "Min Danger Level:" },
    ]);
    const dangerLevelValue =
      typeof filters.dangerLevel === "number" ? filters.dangerLevel : undefined;
    console.table(
      this.search.searchInventions(
        filters.name || undefined,
        filters.typeInv || undefined,
        filters.inventorID || undefined,
        dangerLevelValue,
      ),
    );
  }
}
