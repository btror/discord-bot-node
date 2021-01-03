const User = require("../models/User");
// const { db } = require("../models/User");

module.exports = function () {
  (this.currencyManager = function (input) {
    if (!input.author.bot) {
      var author = input.author.id;
      // check db if author is registered
      User.findOne({ author: author }).then((user) => {
        if (user) {
          user.wallet += 0.01;
          user.wallet = Math.round((user.wallet + Number.EPSILON) * 100) / 100;
          user.save();
        } else {
          const newUser = new User({
            author,
          });
          newUser.author = author;
          newUser.save().then((user) => {
            console.log("user saved to database");
          });
        }
      });
    }
  }),
    (this.getNetworth = function (input) {
      if (input.content.startsWith("!networth") && !input.author.bot) {
        var author = input.author.id;
        // check db if author is registered
        User.findOne({ author: author }).then((user) => {
          if (user) {
            input.channel.send(
              `${input.author} your networth is $${user.wallet}`
            );
          } else {
            input.channel.send(`${input.author} your networth is $0.00`);
          }
        });
      }
    });
};
