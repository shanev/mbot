var assert = require('assert');

describe('Tweet', () => {
  const re = /[A-Z0-9]{3,5}/;

  it('should find DGB symbol in tweet', () => {
    const tweet = 'Coin of the day: Digibyte (DGB). Using a Blockchain which is 40 times faster than Bitcoin and having one of the most decentralized mining systems in the world - based on 5 different synergistic algorithms. DGB adherents call the coin "The Sleeping Giant".';
    const symbol = tweet.match(re)[0];
    assert.equal(symbol, 'DGB');
  });

  it('should find BURST symbol in tweet', () => {
    const tweet = 'Coin of the day: BURST -- First truly Green coin and most overlooked coin. Uses 400 times less power than Bitcoin. Super secure and private. Includes smart contracts, encrypted messaging, decentralized wallet, libertine blockchain. Most undervalued coin. https://www.burst-coin.org';
    const symbol = tweet.match(re)[0];
    assert.equal(symbol, 'BURST');
  });

  it('should find 400 symbol in tweet', () => {
    const tweet = 'Coin of the day: 400 -- First truly Green coin and most overlooked coin. Uses 400 times less power than Bitcoin. Super secure and private. Includes smart contracts, encrypted messaging, decentralized wallet, libertine blockchain. Most undervalued coin. https://www.burst-coin.org';
    const symbol = tweet.match(re)[0];
    assert.equal(symbol, '400');
  });

  it('should not find burst symbol in tweet', () => {
    const tweet = 'Coin of the day: burst -- First truly Green coin and most overlooked coin. Uses 40 times less power than Bitcoin. Super secure and private. Includes smart contracts, encrypted messaging, decentralized wallet, libertine blockchain. Most undervalued coin. https://www.burst-coin.org';
    const found = tweet.match(re);
    assert.equal(found, null);
  });

  it('should not find symbol in tweet', () => {
    const tweet = 'This tweet does not contain a symbol.';
    const found = tweet.match(re);
    assert.equal(found, null);
  });
});
