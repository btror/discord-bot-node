module.exports = function () {
  this.spam = function (input) {
    if (input.content.startsWith("!spam") && !input.author.bot) {
      var spamContent = input.content.substring(6, input.content.length) + " ";

      var amount = 1999 / spamContent.length;
      amount = parseInt(amount);

      var result = "";
      for (var i = 0; i < amount; i++) {
        result += spamContent;
      }

      result = result.substring(0, 1999);

      input.channel.send(result);
    }
  };
};
