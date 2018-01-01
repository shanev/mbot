const assert = require('assert');
const CoinMktCapApi = require('../src/coinmktcap');

describe('CoinMarketCap API', () => {
  describe('findTickerIdBySymbol', () => {
    it('should find ticker id for FTC', async () => {
      assert.equal(await CoinMktCapApi.findTickerIdBySymbol('FCT'), 'factom');
    }).timeout(5000);

    it('should not find ticker id for SHANE', async () => {
      assert.equal(await CoinMktCapApi.findTickerIdBySymbol('SHANE'), null);
    }).timeout(5000);
  });
});
