import prompts from "prompts";
import { MultiverseManager } from "../../services/MultiverseManager.js";


/**
 * @class ReportsUIHandler
 * repirt handler for handling the analytical reports interface
 */
export class ReportHandler {

  constructor(private readonly manager: MultiverseManager) {}

  /**
   * Displays the report selection menu and prints the results
   */
  public async showMenu(): Promise<void> {
    const response = await prompts({
      type: "select",
      name: "reportType",
      message: "Select Analytical Report:",
      choices: [
        { title: "Active Dimensions Tech Level", value: "tech" },
        { title: "Character Alternative Versions Count", value: "versions" },
        { title: "Character Registry", value: "registry" },
        { title: "Most Dangerous Inventions Currently Deployed", value: "danger" },
        { title: "Back", value: "back" },
      ],
    });

    const reportType = response.reportType as string;

    if (reportType === "back" || !reportType) {
      return;
    }

    await this.displayReport(reportType);

    await prompts({
      type: "text",
      name: "pause",
      message: "Press enter to continue...",
    });
  }

  /**
   * Executes the manager logic and displays the data in table format
   * @param type The type of report to generate.
   * @returns A promise that resolves when the report is fully displayed
   */
  private async displayReport(type: string): Promise<void> {
    console.log(`\n--- Generating ${type.toUpperCase()} Report ---`);

    if (type === "tech") {
      const techReport = this.manager.getTechReport();
      console.table(techReport.dimensions);
      console.log(`Global average tech level: ${techReport.average}`);
    } else if (type === "versions") {
      console.table(this.manager.getVersionAnalytics());
    } else if (type === "danger") {
      console.table(this.manager.getDangerReport());
    } else if (type === "registry") {
      await this.registryChar();
    }
  }

  /**
   * Asks for a character ID and displays its travel registry
   * @private
   */
  private async registryChar(): Promise<void> {
    const { id } = await prompts({
      type: "text",
      name: "id",
      message: "Character id: ",
    });

    if (id) {
      console.table(this.manager.getCharacterHistory(id));
    }
  }
}
