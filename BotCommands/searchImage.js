const cheerio = require("cheerio");
const request = require("request");

module.exports = function () {
  this.searchImage = function (input) {
    // search images
    if (
      (input.content.startsWith("!getpic") ||
        input.content.startsWith("/getpic")) &&
      !input.author.bot
    ) {
      // hide message if it contains a slash
      if (input.content.charAt(0) == "/") {
        input.delete();
      }

      // content after command
      var searchWord = input.content.substring(8, input.content.length);

      var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + searchWord,
        method: "GET",
        headers: {
          Accept: "text/html",
          "User-Agent": "Chrome",
        },
      };

      request(options, function (error, response, responseBody) {
        if (error) {
          return;
        }
        $ = cheerio.load(responseBody);
        var links = $(".image a.link");
        var urls = new Array(links.length)
          .fill(0)
          .map((v, i) => links.eq(i).attr("href"));

        if (!urls.length) {
          return;
        }
        input.channel.send(urls[Math.floor(Math.random() * urls.length)] + " ");
      });
    }
  };
};
