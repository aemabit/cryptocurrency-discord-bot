require("dotenv").config();
const TOKEN = process.env.BOT_TOKEN;
const commandHandler = require("./commands")

const Discord = require("discord.js");
const client = new Discord.Client();
client.login(TOKEN);
client.on("ready", readyDiscord);

function readyDiscord() {
  console.log("Doge 🐶 | Bot 🤖 | Ready 🔥");
}

client.on("message", commandHandler);
