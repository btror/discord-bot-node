const util = require("minecraft-server-util");
const Discord = require("discord.js");
// var CronJob = require("cron").CronJob;

module.exports = function () {
  var ip = "";
  var port = 0;
  (this.mcserverStatus = function (input) {
    if (input.content == "!mcserver" && !input.author.bot) {
      if ((ip != "" || ip != null) && port != 0) {
        util
          .status(ip, {
            port: port,
            enableSRV: true,
            timeout: 5000,
            protocolVersion: 47,
          })
          .then((response) => {
            var playerNames = [];
            for (var i = 0; i < response.samplePlayers.length; i++) {
              playerNames[i] = response.samplePlayers[i].name;
            }

            var writtenNames = "";
            for (var i = 0; i < playerNames.length; i++) {
              if (i == playerNames.length - 1) {
                writtenNames += playerNames[i];
              } else {
                writtenNames += playerNames[i] + " | ";
              }
            }

            var mods = response.modInfo;
            if (mods == null) {
              mods = "none";
            }

            const embed = new Discord.MessageEmbed();

            var letters = "0123456789ABCDEF";
            var color = "#";
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            embed.setColor(color);
            embed.setTitle("Server Status");
            embed.setTimestamp();
            embed.setDescription("Lemon's Minecraft server");
            embed.addField("version", response.version, false);
            embed.addField("players", writtenNames, false);
            embed.addField("mods", mods, false);

            input.channel.send({ embed: embed }).catch(Discord.DiscordAPIError);
          });
      }
    }
  }),
    (this.setmcaddress = function (input) {
      if (input.content.startsWith("!setmcaddress") && !input.author.bot) {
        var address = input.content.split(":");
        ip = address[0].substring(14, address[0].length);
        var holder = address[1];
        port = Number(holder);
        console.log("\nIP: " + ip);
        console.log("\nPORT: " + port);

        input.channel.send("server address set to " + ip + ":" + port);
      }
    });
};
