const axios = require('axios');

class CoinMktCapApi {
  static async findTickerIdBySymbol(symbol) {
    const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=0';
    try {
      const response = await axios.get(url, { timeout: 5000 });
      const data = response.data;
      for (var item of data) {
        if (item.symbol === symbol) {
          return item.id;
        } else {
          return null;
        }
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = CoinMktCapApi;
