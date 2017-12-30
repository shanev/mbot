require('dotenv').config();

const bittrex = require('node-bittrex-api');

bittrex.options({
  'apikey': process.env.BITTREX_API_KEY,
  'apisecret': process.env.BITTREX_API_SECRET,
});

class Bittrex {
  static async buy(symbol, tradePrice) {
    bittrex.getmarkets((data, err) => {
      if (err) {
        return console.error(err);
      }

      const market = data.result.find((item) => {
        return (item.MarketCurrency === symbol);
      });
      console.log(market);

      // get price from order history
      bittrex.getmarkethistory({ market: market.MarketName }, (data, err) => {
        const price = data.result[0].Price;
        console.log('last price: ' + price);

        // place limit order for last traded price
        bittrex.tradebuy({
          MarketName: market.MarketName,
          OrderType: 'LIMIT',
          Quantity: tradePrice / price,
          Rate: price,
          TimeInEffect: 'IMMEDIATE_OR_CANCEL', // supported options are 'IMMEDIATE_OR_CANCEL', 'GOOD_TIL_CANCELLED', 'FILL_OR_KILL'
          ConditionType: 'NONE', // supported options are 'NONE', 'GREATER_THAN', 'LESS_THAN'
          Target: 0, // used in conjunction with ConditionType
        }, (data, err) => {
          if (err != null) {
            console.error(err);
          }
          console.log(data);
        });
      });
    });
  }
}

module.exports = Bittrex;
