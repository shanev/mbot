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
      for (var i in data.result) {
        if (data.result[i].MarketCurrency === symbol) {
          const market = data.result[i].MarketName;
          console.log('market: ' + market);

          // get price from order history
          bittrex.getmarkethistory({ market }, (data, err) => {
            const price = data.result[0].Price;
            console.log('last price: ' + price);

            // place limit order for last traded price
            bittrex.tradebuy({
              MarketName: market,
              OrderType: 'LIMIT',
              Quantity: tradePrice / price,
              Rate: price,
              TimeInEffect: 'IMMEDIATE_OR_CANCEL', // supported options are 'IMMEDIATE_OR_CANCEL', 'GOOD_TIL_CANCELLED', 'FILL_OR_KILL'
              ConditionType: 'NONE', // supported options are 'NONE', 'GREATER_THAN', 'LESS_THAN'
              Target: 0, // used in conjunction with ConditionType
            }, function(data, err) {
              if (err != null) {
                console.log(err);
                return;
              }
              console.log(data);
              return;
            });
          });

          break;
        }
      }
    });
  }
}

module.exports = Bittrex;
