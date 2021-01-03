const Discord = require("discord.js");

module.exports = function () {
  this.listCommands = function (input) {
    if (input.content == "!utilitycommands" && !input.author.bot) {
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
            name: "!getgif or /getgif",
            value:
              "syntax: !getgif <any word>\nabout: allows people in a server to get gifs of something without having to search for it (do not include <> just type the word or phrase after the command)",
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
            name: "!networth",
            value:
              "syntax: !networth\nabout: allows people in a server to track their server networth",
          },
          {
            name: "!utilitycommands",
            value:
              "syntax: !utilitycommands\nabout: shows all available bot commands",
          }
        )
        .setFooter("see on GitHub: https://github.com/btror/discord-bot-node");

      input.channel.send(embed);
    }
  };
};
