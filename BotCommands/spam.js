module.exports = function () {
  this.spam = function (input) {
    if (input.content.startsWith("!spam") && !input.author.bot) {
      var spamContent = input.content.substring(6, input.content.length);
      for (var i = 0; i < 5; i++) {
        input.channel.send(spamContent);
      }
    }
  };
};
