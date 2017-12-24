const axios = require('axios');

class CoinMktCapApi {
  static async isListed(symbol) {
    let symbols = [];
    const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=0';
    try {
      const response = await axios.get(url);
      const data = response.data;
      for (var item of data) {
        symbols.push(item.symbol);
      }
      if (symbols.includes(symbol) == true) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = CoinMktCapApi;
