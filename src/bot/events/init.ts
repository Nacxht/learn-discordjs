import { onInteractionCreate, onReady } from "./handler.js";
import { Client } from "discord.js";

const events: Array<Function> = [onReady, onInteractionCreate];

export async function eventHandlerInit(client: Client) {
	events.forEach((event) => {
		event(client);
	});
}
