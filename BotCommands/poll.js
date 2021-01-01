const Discord = require("discord.js");
const discordEmoji = require("discord-emoji");

module.exports = function () {
  this.poll = function (input) {
    if (input.content.includes("!poll") && !input.author.bot) {
      // make sure user input has something after !poll
      if (input.content.length > 5) {
        var quotes = input.content.split('"').length - 1;
        // if the user has a question and at least one answer
        if (quotes > 2) {
          // if the user has an even amount of quotes
          if (quotes % 2 == 0) {
            // get the content from the question
            var message = input.content.substring(6, input.content.length);

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
            embed.setAuthor(input.author.tag);

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
              "created by " + input.author.username,
              input.author.displayAvatarURL({ format: "png", dynamic: true })
            );

            input.channel
              .send({ embed: embed })
              .then((embedMessage) => {
                for (var i = 1; i < content.length; i++) {
                  embedMessage.react(letters[i]);
                }
              })
              .catch(Discord.DiscordAPIError);

            input.delete();
          }
        }
      }
    }
  };
};
