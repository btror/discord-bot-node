require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on("ready", () => {
  console.info(`logged in as ${bot.user.tag}!`);
});

// commands

bot.on("message", (msg) => {
  // test command
  if (msg.content === "ping") {
    //msg.reply("pong");
    msg.channel.send("pong");
  }

  // poll command
  if (msg.content.includes("!poll") && !msg.author.bot) {
    // make sure user input has something after !poll
    if (msg.content.length > 5) {
      var quotes = msg.content.split('"').length - 1;
      // if the user has a question and at least one answer
      if (quotes > 2) {
        // if the user has an even amount of quotes
        if (quotes % 2 == 0) {
          // get the content from the question
          var message = msg.content.substring(6, msg.content.length);

          var indexes = [];
          // get the indexes of each quotation mark
          for (var i = 0; i < message.length; i++) {
            if (message.charAt(i) == '"') {
              indexes.push(i);
            }
          }

          const content = message.split(/\s(?=")/);
          for (var i = 0; i < content.length; i++) {
            content[i] = content[i].split('"').join("");
          }

          // display data
          const embed = new Discord.MessageEmbed();
          embed.setAuthor(msg.author.tag);

          // generate random color
          var letters = "0123456789ABCDEF";
          var color = "#";
          for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          embed.setColor(color);
          embed.setTitle("Server Poll");
          embed.setTimestamp();
          embed.setDescription(content[0]);

          
          var letters = [
            "0",
            "🇦",
            "🇧",
            "🇨",
            "🇩",
            "🇪",
            "🇫",
            "🇬",
            "🇭",
            "🇮",
            "🇯",
            "🇰",
            "🇱",
            "🇲",
            "🇳",
            "🇴",
            "🇵",
            "🇶",
            "🇷",
            "🇸",
            "🇹",
            "🇺",
            "🇻",
            "🇼",
            "🇽",
            "🇾",
            "🇿",
          ];
          for (var i = 1; i < content.length; i++) {
            embed.addField(letters[i], content[i], false);
          }

          embed.setFooter(
            "created by " + msg.author.username,
            msg.author.displayAvatarURL({ format: "png", dynamic: true })
          );

          msg.channel
            .send(embed)
            .then(function (msg) {
              for (var i = 0; i < content.length; i++) {
                msg.react(letters[i]);
              }
            })
            .catch(Discord.DiscordAPIError);

          msg.delete();
        }
      }
    }
  }
});

process.on("SIGINT", function () {
  console.log("shutting down process");
  process.exit(1);
});
