const util = require("minecraft-server-util");
// var CronJob = require("cron").CronJob;

module.exports = function () {
  var ip = "";
  var port = 0;
  (this.mcserverStatus = function (input) {
    if (input.content == "!mcserver" && !input.author.bot) {
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

          var mods = response.modInfo;
          if (mods == null) {
            mods = "none";
          }

          input.channel.send(
            "version: " +
              response.version +
              "\nonline: " +
              response.onlinePlayers +
              "\nplayer names: " +
              playerNames +
              "\nmods: " +
              mods
          );
        })
        .catch((error) => {
          input.channel.send(
            "incorrect server address or server does not exist"
          );
          throw error;
        });
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

        input.channel.send("server address set to " + ip);
      }
    });
};
