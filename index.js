require("dotenv").config();

const Discord = require("discord.js");
const bot = new Discord.Client();
const cheerio = require("cheerio");
const request = require("request");
const ud = require("urban-dictionary");

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on("ready", () => {
  console.info(`logged in as ${bot.user.tag}!`);
});

// commands
bot.on("message", (msg) => {
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

  // "I'm" troll
  if (
    (msg.content.includes(" I'm ") ||
      msg.content.includes(" i'm ") ||
      msg.content.includes(" I'M ")) &&
    !msg.author.bot
  ) {
    // get all words after the word "I'm"
    var start = 0;
    for (var i = 0; i < msg.content.length; i++) {
      if (msg.content.charAt(i) == " ") {
        start = i;
        break;
      }
    }
    var firstWord = "";
    firstWord = msg.content.substring(start, msg.content.length);

    if (!msg.author.bot) {
      msg.channel.send("Hello" + firstWord + ", I'm Utility Bot!");
    }
  }

  // search images
  if (
    (msg.content.includes("!getpic") || msg.content.includes("/getpic")) &&
    !msg.author.bot
  ) {
    // hide message if it contains a slash
    if (msg.content.charAt(0) == "/") {
      msg.delete();
    }

    // content after command
    var searchWord = msg.content.substring(8, msg.content.length);

    var options = {
      url: "http://results.dogpile.com/serp?qc=images&q=" + searchWord,
      method: "GET",
      headers: {
        Accept: "text/html",
        "User-Agent": "Chrome",
      },
    };

    request(options, function (error, response, responseBody) {
      if (error) {
        return;
      }
      $ = cheerio.load(responseBody);
      var links = $(".image a.link");
      var urls = new Array(links.length)
        .fill(0)
        .map((v, i) => links.eq(i).attr("href"));

      if (!urls.length) {
        return;
      }
      msg.channel.send(urls[Math.floor(Math.random() * urls.length)] + " ");
    });
  }

  // define a word
  if (msg.content.startsWith("!define") && !msg.author.bot) {
    var word = msg.content.substring(8, msg.content.length);

    ud.define(word)
      .then((results) => {
        console.log(results[0].definition);
        var def = results[0].definition;
        def = def.substring(0, 1999);
        msg.channel.send(def);
      })
      .catch((error) => {
        console.error(`define (promise) - error ${error.message}`);
      });
  }
});

process.on("SIGINT", function () {
  console.log("shutting down process");
  process.exit(1);
});
