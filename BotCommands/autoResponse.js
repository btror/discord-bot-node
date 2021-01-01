module.exports = function () {
  this.imResponse = function (input) {
    if (
      (input.content.includes("I'm ") ||
        input.content.includes("i'm ") ||
        input.content.includes("I'M ")) &&
      !input.author.bot
    ) {
      var word = "";

      if (input.content.includes("I'm ")) {
        word = "I'm";
      } else if (input.content.includes("i'm")) {
        word = "i'm";
      } else if (input.content.includes("I'M")) {
        word = "I'M";
      }

      var contentBreak = input.content.split(word);

      if (!input.author.bot) {
        input.channel.send("Hello" + contentBreak[1] + ", I'm Utility Bot!");
      }
    }
  };
};
