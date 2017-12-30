const assert = require('assert');
const Tweets = require('../src/tweets');

describe('Tweets', () => {
  const tweet = { 
    text: 'Coin of the week',
    entities: {
      media: [ { media_url: 'http://pbs.twimg.com/media/DR-kkH4XcAAQ-vc.jpg' }]
    }  
  }

  const badTweet = { 
    text: 'Coin of the day',
    entities: { media: [] }
  }

  describe('_coinOfTheWeek()', () => {
    it('should return true', () => {
      assert(Tweets._coinOfTheWeek(tweet));
    });

    it('should return false', () => {
      assert(Tweets._coinOfTheWeek(badTweet) == false);
    });
  });

  describe('_imageUrl()', () => {
    it('should return a url for tweet', () => {
      const url = Tweets._imageUrl(tweet);
      assert.equal(url, 'http://pbs.twimg.com/media/DR-kkH4XcAAQ-vc.jpg');
    });

    it('should return null for bad tweet', () => {
      const url = Tweets._imageUrl(badTweet);
      assert.equal(url, null);
    });
  });

  describe('CoinEmitter', () => {
    it('should emit a symbol', () => {
      const coinEmitter = Tweets.coinEmitter;
      coinEmitter.on('data', (coin) => {
        assert.equal(coin.symbol, 'ETH');
        assert.equal(coin.tickerId, 'ethereum');
      });
      Tweets._emitCoin('ETH', 'ethereum');
    });
  });
});
