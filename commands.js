require("dotenv").config();

const CHANNEL = process.env.CHANNEL_ID;
const SERVER = process.env.SERVER_ID;

const crypto = require("./commands/crypto.js");
const helper = require("./commands/helper.js");

const CryptoArray = require("./helpers/crypto");

const commands = { helper, crypto };

module.exports = async (msg) => {
  if (msg.guild.id == SERVER && msg.channel.id === CHANNEL) {
    let token = msg.content.split(" ");
    let command = token.shift();
    // VERIFY COMMAND
    if (command.charAt(0) === "!") {
      command = command.substring(1);
      // CHECK IF EXIST CURRENCY COMMAND
      const currency = CryptoArray.filter((crypto) => crypto.value == command);
      if (currency.length == 0) {
        msg.channel.send(
          "😭 Sorry don't have that crypto command! try **--helper**"
        );
        return null;
      }
      commands["crypto"](msg, currency);
    }

    if (command.substring(0, 2) == "--") {
      command = command.substring(2);
      try {
        commands[command](msg);
      } catch (error) {
        msg.channel.send("⚠️ Don't have that command! try **--helper**");
      }
    }
  }
};
