require("dotenv").config();

const commands = require("./commands.js");
const Discord = require("discord.js");

const bot = new Discord.Client();

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on("ready", () => {
  console.info(`logged in as ${bot.user.tag}!`);
});

bot.on("message", (msg) => {
  // poll command
  commands.poll(msg);

  // search images (cheerio) command
  commands.searchImage(msg);

  // search gif (giphy) command
  commands.searchGif(msg);

  // I'm troll response
  commands.imResponse(msg);

  // definition (urban dictionary) command
  commands.searchDefinition(msg);

  // spam command
  commands.spam(msg);

  // list bot commands command
  commands.listCommands(msg);
});

process.on("SIGINT", function () {
  console.log("shutting down process");
  process.exit(1);
});
