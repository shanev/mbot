const assert = require('assert');
const axios = require('axios');

describe('CoinMarketCap API', () => {
  it('should fetch results', async () => {
    const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=1';
    try {
      const response = await axios.get(url);
      const data = response.data;
      for (var item of data) {
        assert.equal(item.symbol, 'BTC');
      }
    } catch (error) {
      console.log(error);
    }        
  });
});
