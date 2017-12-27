const assert = require('assert');
const CoinMktCapApi = require('../src/coinmktcap');

describe('CoinMarketCap API', () => {
  describe('findBySymbol', () => {
    it('should find ticker id for BTC', async () => {
      assert.equal(await CoinMktCapApi.findTickerIdBySymbol('BTC'), 'bitcoin');
    }).timeout(5000);

    it('should not find ticker id for SHANE', async () => {
      assert.equal(await CoinMktCapApi.findTickerIdBySymbol('SHANE'), null);
    }).timeout(5000);
  });
});
