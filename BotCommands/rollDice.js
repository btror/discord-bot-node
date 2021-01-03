const { MessageAttachment } = require("discord.js");

module.exports = function () {
  this.rollDice = function (input) {
    if (input.content == "!rolldice" && !input.author.bot) {
      // var sides = [];
      // sides[1] = new Image();
      // sides[1].src = "../gifs/dice_result_1.gif";
      // input.channel.send(sides[1]);
      const attachment = new MessageAttachment("https://media.giphy.com/media/iVdt1CCwxSNAPxVZaj/giphy.gif");
      input.channel.send(attachment);

    }
  };
};
