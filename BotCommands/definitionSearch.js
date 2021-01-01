const ud = require("urban-dictionary");

module.exports = function () {
  this.searchDefinition = function (input) {
    if (input.content.startsWith("!define") && !input.author.bot) {
      var word = input.content.substring(8, input.content.length);

      ud.define(word)
        .then((results) => {
          console.log(results[0].definition);
          var def = results[0].definition;
          def = def.substring(0, 1999);
          input.channel.send(def);
        })
        .catch((error) => {
          console.error(`define (promise) - error ${error.message}`);
        });
    }
  };
};
