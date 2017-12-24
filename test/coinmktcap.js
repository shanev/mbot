const assert = require('assert');
const CoinMktCapApi = require('../coinmktcap');

describe('CoinMarketCap API', () => {
  it('BTC should be listed', async () => {
    assert(await CoinMktCapApi.isListed('BTC'));
  });

  it('ETH should be listed', async () => {
    assert(await CoinMktCapApi.isListed('ETH'));
  });

  it('SHANE should not be listed', async () => {
    assert(await CoinMktCapApi.isListed('SHANE') == false);
  });
});
