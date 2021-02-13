const CryptoArray = require("../helpers/crypto");

module.exports = async (msg) => {
  const cryptoCommands = [];
  CryptoArray.map((crypto) => {
    cryptoCommands.push({
      name: crypto.name,
      value: `Command: **!${crypto.value}**`,
      inline: true,
    });
  });

  const helperMsg = {
    color: 0x0099ff,
    title: "**Crypto Currency Commands**",
    author: {
      name: "<Aemabit>",
      icon_url: "https://aemabitfolder.sfo2.digitaloceanspaces.com/abit_logo.png",
      url: "https://github.com/aemabit",
    },
    description:
      "Hello user! im here to help you!. Down this description you can see all command now disponibles to get information at realtime about you prefer cryptocurrency. ",
    thumbnail: {
      url:
        "https://i.pinimg.com/originals/95/5b/f0/955bf015517ea04757c9c8c7307c62e5.jpg",
    },
    fields: cryptoCommands,
  };

  msg.channel.send({ embed: helperMsg });
};
