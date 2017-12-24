const assert = require('assert');
const CoinMktCapApi = require('../src/coinmktcap');

describe('CoinMarketCap API', () => {
  describe('findBySymbol', () => {
    it('should find ticker id for BTC', async () => {
      assert.equal(await CoinMktCapApi.findTickerIdBySymbol('BTC'), 'bitcoin');
    });

    it('should not find ticker id for SHANE', async () => {
      assert.equal(await CoinMktCapApi.findTickerIdBySymbol('SHANE'), null);
    });
  });
});
