//1. Import coingecko-api
const CoinGecko = require("coingecko-api");
//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

module.exports = async (msg, currency) => {
  //   IF EXISTS CONSULT TO COINGECKO
  const { name } = currency[0];
  try {
    let data = await CoinGeckoClient.coins.fetch(name.toLowerCase(), {});

    if (data.code !== 200) {
      msg.channel.send("😭 Sorry we can't found records!");
      return null;
    }

    //   IF DATA SUCCESS!
    const makertData = data.data.tickers.filter(
      (local) => local.target === "USD"
    );

    const result = {
      title: data.data.name,
      description: data.data.description.en.replace(/<\/?[^>]+(>|$)/g, ""),
      image: data.data.image.small,
      fields: [
        {
          name: "Sentiment 📈",
          value: `**%${data.data.sentiment_votes_up_percentage}**`,
          inline: true,
        },
        {
          name: "Sentiment 📉",
          value: `**%${data.data.sentiment_votes_down_percentage}**`,
          inline: true,
        },
        {
          name: "Price 💵",
          value: `**$${makertData[0].last}**`,
          inline: true,
        },
      ],
    };

    const cryptoMsg = {
      color: 0x0099ff,
      title: result.title,
      author: {
        name: "<Aemabit>",
        icon_url:
          "https://aemabitfolder.sfo2.digitaloceanspaces.com/abit_logo.png",
        url: "https://github.com/aemabit",
      },
      description: result.description.slice(0, 150) + "...",
      thumbnail: {
        url: result.image,
      },
      fields: result.fields,
    };

    msg.channel.send({ embed: cryptoMsg });
  } catch (error) {
    msg.channel.send("😭 Please try again!");
    return null;
  }
};
