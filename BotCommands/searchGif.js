const Discord = require("discord.js");

const GIPHY_KEY = process.env.GIPHY_KEY;
const giphy = require("giphy-api")(GIPHY_KEY);

module.exports = function () {
  (this.searchGif = function (input) {
    if (
      (input.content.startsWith("!getgif") ||
        input.content.startsWith("/getgif")) &&
      !input.author.bot
    ) {
      // hide message if it contains a slash
      if (input.content.charAt(0) == "/") {
        input.delete();
      }
      var gifSearch = input.content.substring(8, input.content.length);

      giphy
        .random({
          tag: gifSearch,
          rating: "r",
          fmt: "json",
        })
        .then((response) => {
          var a = response.data.bitly_url;
          if (a == null) {
            input.channel.send("Gif not found on Giphy. Try a different word.");
          } else {
            input.channel.send(a);
          }
        })
        .catch(Discord.DiscordAPIError);
    }
  }),
    (this.searchImage = function (input) {
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
          input.channel.send(
            urls[Math.floor(Math.random() * urls.length)] + " "
          );
        });
      }
    });
};
