import dotenv from "dotenv";
dotenv.config();

const BOT_TOKEN: string = process.env.BOT_TOKEN || "";

export const botConfig = {
	token: BOT_TOKEN,
};
