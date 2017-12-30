const axios = require('axios');

let dataCache = {};

class CoinMktCapApi {
  static async findTickerIdBySymbol(symbol) {
    const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=0';
    try {
      const response = await axios.get(url, { timeout: 5000 });
      let data = response.data;
      if (response.status != 200) {
        data = dataCache;
      }
      dataCache = data;
      return getCoinId(data, symbol);
    } catch (error) {
      console.error(error);
    }
    return getCoinId(dataCache, symbol);
  }
}

function getCoinId(data, symbol) {
  if (data.length > 0) {
    const coin = data.find((item) => item.symbol === symbol);
    return (coin === undefined) ? null : coin.id;                  
  } else {
    return null;
  }
}

module.exports = CoinMktCapApi;
