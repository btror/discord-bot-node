require("./BotCommands/poll.js")();
require("./BotCommands/autoResponse.js")();
require("./BotCommands/searchGif.js")();
require("./BotCommands/searchImage.js")();
require("./BotCommands/definitionSearch.js")();
require("./BotCommands/spam.js")();
require("./BotCommands/listCommands")();

module.exports = {
  searchGif,
  searchImage,
  poll,
  imResponse,
  searchDefinition,
  spam,
  listCommands
};
