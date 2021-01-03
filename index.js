require("dotenv").config();

const commands = require("./commands.js");

const mongoose = require("mongoose");
const Discord = require("discord.js");


const bot = new Discord.Client();
const db = require("./config/keys").MongoURI;
const dbConnect = mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on("ready", () => {
  console.info(`logged in as ${bot.user.tag}!`);
});

bot.on("message", (msg) => {
  // poll command
  commands.poll(msg);

  // manage user currency
  commands.currencyManager(msg);

  // get user networth
  commands.getNetworth(msg);

  // search images (cheerio) command
  commands.searchImage(msg);

  // search gif (giphy) command
  commands.searchGif(msg);

  // definition (urban dictionary) command
  commands.searchDefinition(msg);

  // spam command
  commands.spam(msg);

  // list bot commands command
  commands.listCommands(msg);

  // I'm troll response
  commands.imResponse(msg);
});

process.on("SIGINT", function () {
  console.log("shutting down process");
  process.exit(1);
});
