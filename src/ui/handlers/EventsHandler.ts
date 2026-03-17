import prompts from "prompts";
import { MultiverseManager } from "../../services/MultiverseManager.js";
import { DimensionStatus } from "../../interfaces/IDimension.js";

/**
 * @class EventsUIHandler
 * Event handler specialized in managing the event interface and prompts from CLI
 */
export class EventsHandler {
  constructor(private readonly manager: MultiverseManager) {}

  /**
   * Displays the events menu and executes the selected action
   */
  public async showMenu(): Promise<void> {
    const response = await prompts({
      type: "select",
      name: "action",
      message: "Multiverse Events:",
      choices: [
        { title: "Register Travel", value: "travel" },
        { title: "Dimension Paradox (State Change)", value: "paradox" },
        { title: "Back", value: "back" },
      ],
    });

    const action = response.action as string;

    if (action === "back" || !action) {
      return;
    }

    try {
      if (action === "travel") {
        await this.handleTravel();
      } else if (action === "paradox") {
        await this.handleParadox();
      }
    } catch (error) {
      console.log("Error: " + (error as Error).message);
    }

    await prompts({
      type: "text",
      name: "pause",
      message: "Press enter to continue...",
    });
  }

  /**
   * Handles the interactive prompt for character travel
   */
  private async handleTravel(): Promise<void> {
    const data = await prompts([
      { type: "text", name: "characterId", message: "Character ID:" },
      {
        type: "text",
        name: "dimensionId",
        message: "Destination Dimension ID:",
      },
      { type: "text", name: "reason", message: "Reason for travel:" },
    ]);

    if (data.characterId && data.dimensionId) {
      await this.manager.registerTravel(
        data.characterId,
        data.dimensionId,
        data.reason,
      );
      console.log("Travel registered successfully.");
    }
  }

  /**
   * Handles the interactive prompt for dimension state paradoxes
   */
  private async handleParadox(): Promise<void> {
    const data = await prompts([
      { type: "text", name: "dimensionId", message: "Dimension ID:" },
      {
        type: "text",
        name: "status",
        message: "New Status (Active/Destroyed/Quarantined):",
      },
      { type: "text", name: "reason", message: "Reason for state change:" },
    ]);

    if (data.dimensionId && data.status) {
      await this.manager.updateDimensionState(
        data.dimensionId,
        data.status as DimensionStatus,
        data.reason,
      );
      console.log("Dimension status updated successfully.");
    }
  }
}
