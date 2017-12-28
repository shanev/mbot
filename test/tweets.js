const assert = require('assert');
const Tweets = require('../src/tweets');

describe('Tweets', () => {
  const tweet = { 
    text: 'Coin of the week',
    entities: {
      media: [ { media_url: 'http://url' }]
    }  
  }

  const badTweet = { 
    text: 'Coin of the day',
    entities: { media: [] }
  }

  describe('coinOfTheWeek()', () => {
    it('should return true', () => {
      assert(Tweets.coinOfTheWeek(tweet));
    });

    it('should return false', () => {
      assert(Tweets.coinOfTheWeek(badTweet) == false);
    });
  });

  describe('imageUrl()', () => {
    it('should return a url for tweet', () => {
      const url = Tweets.imageUrl(tweet);
      assert.equal(url, 'http://url');
    });

    it('should return null for bad tweet', () => {
      const url = Tweets.imageUrl(badTweet);
      assert.equal(url, null);
    });

  });

  // describe('coinOfTheDay()', () => {
  //   it('should find DGB symbol in tweet', () => {
  //     const tweet = { text: 'Coin of the day: Digibyte (DGB). Using a Blockchain which is 40 times faster than Bitcoin and having one of the most decentralized mining systems in the world - based on 5 different synergistic algorithms. DGB adherents call the coin "The Sleeping Giant".' };
  //     const symbol = Tweets.coinOfTheDay(tweet);
  //     assert.equal(symbol, 'DGB');
  //   });

  //   it('should find BURST symbol in tweet', () => {
  //     const tweet = { text: 'Coin of the day: BURST -- First truly Green coin and most overlooked coin. Uses 400 times less power than Bitcoin. Super secure and private. Includes smart contracts, encrypted messaging, decentralized wallet, libertine blockchain. Most undervalued coin. https://www.burst-coin.org' };
  //     const symbol = Tweets.coinOfTheDay(tweet);
  //     assert.equal(symbol, 'BURST');
  //   });

  //   it('should find 400 symbol in tweet', () => {
  //     const tweet = { text: 'Coin of the day: 400 -- First truly Green coin and most overlooked coin. Uses 400 times less power than Bitcoin. Super secure and private. Includes smart contracts, encrypted messaging, decentralized wallet, libertine blockchain. Most undervalued coin. https://www.burst-coin.org' };
  //     const symbol = Tweets.coinOfTheDay(tweet);
  //     assert.equal(symbol, '400');
  //   });

  //   it('should not find burst symbol in tweet', () => {
  //     const tweet = { text: 'Coin of the day: burst -- First truly Green coin and most overlooked coin. Uses 40 times less power than Bitcoin. Super secure and private. Includes smart contracts, encrypted messaging, decentralized wallet, libertine blockchain. Most undervalued coin. https://www.burst-coin.org' };
  //     const symbol = Tweets.coinOfTheDay(tweet);
  //     assert.equal(symbol, null);
  //   });

  //   it('should not find symbol in tweet', () => {
  //     const tweet = { text: 'This tweet does not contain a symbol.' };
  //     const symbol = Tweets.coinOfTheDay(tweet);
  //     assert.equal(symbol, null);
  //   });
  // });
});
