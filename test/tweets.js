const assert = require('assert');
const Tweets = require('../src/tweets');

describe('Tweets', () => {
  describe('coinOfTheDay()', () => {
    it('should find DGB symbol in tweet', () => {
      const tweet = { text: 'Coin of the day: Digibyte (DGB). Using a Blockchain which is 40 times faster than Bitcoin and having one of the most decentralized mining systems in the world - based on 5 different synergistic algorithms. DGB adherents call the coin "The Sleeping Giant".' };
      const symbol = Tweets.coinOfTheDay(tweet);
      assert.equal(symbol, 'DGB');
    });

    it('should find BURST symbol in tweet', () => {
      const tweet = { text: 'Coin of the day: BURST -- First truly Green coin and most overlooked coin. Uses 400 times less power than Bitcoin. Super secure and private. Includes smart contracts, encrypted messaging, decentralized wallet, libertine blockchain. Most undervalued coin. https://www.burst-coin.org' };
      const symbol = Tweets.coinOfTheDay(tweet);
      assert.equal(symbol, 'BURST');
    });

    it('should find 400 symbol in tweet', () => {
      const tweet = { text: 'Coin of the day: 400 -- First truly Green coin and most overlooked coin. Uses 400 times less power than Bitcoin. Super secure and private. Includes smart contracts, encrypted messaging, decentralized wallet, libertine blockchain. Most undervalued coin. https://www.burst-coin.org' };
      const symbol = Tweets.coinOfTheDay(tweet);
      assert.equal(symbol, '400');
    });

    it('should not find burst symbol in tweet', () => {
      const tweet = { text: 'Coin of the day: burst -- First truly Green coin and most overlooked coin. Uses 40 times less power than Bitcoin. Super secure and private. Includes smart contracts, encrypted messaging, decentralized wallet, libertine blockchain. Most undervalued coin. https://www.burst-coin.org' };
      const symbol = Tweets.coinOfTheDay(tweet);
      assert.equal(symbol, null);
    });

    it('should not find symbol in tweet', () => {
      const tweet = { text: 'This tweet does not contain a symbol.' };
      const symbol = Tweets.coinOfTheDay(tweet);
      assert.equal(symbol, null);
    });
  });
});
