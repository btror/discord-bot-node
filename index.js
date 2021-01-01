require("dotenv").config();

const Discord = require("discord.js");
const bot = new Discord.Client();
const cheerio = require("cheerio");
const request = require("request");
const ud = require("urban-dictionary");
const discordEmoji = require("discord-emoji");

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
            discordEmoji.symbols.regional_indicator_a,
            discordEmoji.symbols.regional_indicator_b,
            discordEmoji.symbols.regional_indicator_c,
            discordEmoji.symbols.regional_indicator_d,
            discordEmoji.symbols.regional_indicator_e,
            discordEmoji.symbols.regional_indicator_f,
            discordEmoji.symbols.regional_indicator_g,
            discordEmoji.symbols.regional_indicator_h,
            discordEmoji.symbols.regional_indicator_i,
            discordEmoji.symbols.regional_indicator_j,
            discordEmoji.symbols.regional_indicator_k,
            discordEmoji.symbols.regional_indicator_l,
            discordEmoji.symbols.regional_indicator_m,
            discordEmoji.symbols.regional_indicator_n,
            discordEmoji.symbols.regional_indicator_o,
            discordEmoji.symbols.regional_indicator_p,
            discordEmoji.symbols.regional_indicator_q,
            discordEmoji.symbols.regional_indicator_r,
            discordEmoji.symbols.regional_indicator_s,
            discordEmoji.symbols.regional_indicator_t,
            discordEmoji.symbols.regional_indicator_u,
            discordEmoji.symbols.regional_indicator_v,
            discordEmoji.symbols.regional_indicator_w,
            discordEmoji.symbols.regional_indicator_x,
            discordEmoji.symbols.regional_indicator_y,
            discordEmoji.symbols.regional_indicator_z,
          ];
          for (var i = 1; i < content.length; i++) {
            embed.addField(letters[i], content[i], false);
          }

          embed.setFooter(
            "created by " + msg.author.username,
            msg.author.displayAvatarURL({ format: "png", dynamic: true })
          );

          msg.channel
            .send({ embed: embed })
            .then((embedMessage) => {
              for (var i = 1; i < content.length; i++) {
                embedMessage.react(letters[i]);
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
    (msg.content.includes("I'm ") ||
      msg.content.includes("i'm ") ||
      msg.content.includes("I'M ")) &&
    !msg.author.bot
  ) {
    var word = "";
    if (msg.content.includes("I'm ")) {
      word = "I'm";
    } else if (msg.content.includes("i'm")) {
      word = "i'm";
    } else if (msg.content.includes("I'M")) {
      word = "I'M";
    }

    var contentBreak = msg.content.split(word);
    console.log(contentBreak.length);
    console.log("1 " + contentBreak[0]);
    console.log("2 " + contentBreak[1]);

    if (!msg.author.bot) {
      msg.channel.send("Hello" + contentBreak[1] + ", I'm Utility Bot!");
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

  // spam user
  if (msg.content.startsWith("!spam") && !msg.author.bot) {
    var user = msg.content.substring(6, msg.content.length);
    for (var i = 0; i < 5; i++) {
      msg.channel.send(user + "!!!");
    }
  }

  // commands list
  if (msg.content == "!utilitycommands" && !msg.author.bot) {
    const embed = new Discord.MessageEmbed();
    embed
      .setColor("#0099ff")
      .setTitle("Utility Bot")
      .setURL("https://github.com/btror/discord-bot-node")
      .setAuthor("Bot by btror")
      .setDescription("list of available commands")
      .addFields(
        {
          name: "!poll",
          value:
            'syntax: !poll "question" "choice a" "choice b" "choice c" "etc..."\nabout: allows people in a server to vote on something through reactions (must type questions and answers inside of quotes)',
        },
        {
          name: "!getpic or /getpic",
          value:
            "syntax: !getpic <any word>\nabout: allows people in a server to get pictures of something without having to search for it (do not include <> just type the word or phrase after the command)",
        },
        {
          name: "!define",
          value:
            "syntax: !define <any word>\nabout: allows people in a server to find the definition of a word without having to search for it (do not include <> just type the word or phrase after the command)",
        },
        {
          name: "!spam",
          value:
            "syntax: !spam <any word>\nabout: allows people in a server to spam a word or ping somebody multiple times (do not include <> just type the word or phrase after the command)",
        },
        {
          name: "!utilitycommands",
          value:
            "syntax: !utilitycommands\nabout: shows all available bot commands",
        }
      )
      .setFooter("see on GitHub: https://github.com/btror/discord-bot-node");

    msg.channel.send(embed);
  }
});

process.on("SIGINT", function () {
  console.log("shutting down process");
  process.exit(1);
});
