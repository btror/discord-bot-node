

module.exports = function () {
  this.searchMeme = function (input) {
    if (input.content == "!meme" && !input.author.bot) {
      var word = input.content.substring(6, input.content.length);
      // implementation
    }
  };
};
