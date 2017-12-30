require('dotenv').config();

const Bittrex = require('./bittrex');
const CoinMktCapApi = require('./coinmktcap');
const EventEmitter = require('events');
const Twitter = require('twitter');
const Vision = require('./vision');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const tradePrice = process.env.TRADE_PRICE || process.argv[2];
if (tradePrice == undefined) {
  console.log('Missing argument: trade price.');
  process.exit();
}

class CoinEmitter extends EventEmitter { }
const coinEmitter = new CoinEmitter();

// Consume the tweet stream and fire events
client.stream('statuses/filter', {follow: '961445378'}, (stream) => {
  stream.on('data', async (tweet) => {
    if (_coinOfTheWeek(tweet) == true) {
      const imageUrl = _imageUrl(tweet);
      const vision = new Vision(imageUrl);
      const symbol = await vision.detectSymbol();
      if (symbol != null) {
        console.log('Coin of the week: ${symbol}.');
        const tickerId = await CoinMktCapApi.findTickerIdBySymbol(symbol);
        if (tickerId != null) {
          console.log('https://coinmarketcap.com/currencies/${tickerId}');
          _emitCoin(symbol, tickerId);
          await Bittrex.buy(symbol, parseFloat(tradePice));
        } else {
          console.log('Not listed on CoinMarketCap.');
        }      
      }

    }
  });

  stream.on('error', (error) => {
    console.error(error);
  });
});

function _emitCoin(symbol, tickerId) {
  coinEmitter.emit('data', { symbol, tickerId });  
}

function _imageUrl(tweet) {
  const media = tweet.entities.media;
  if (media.length > 0) {
    return media[0].media_url;
  } else {
    return null;
  }
}

function _coinOfTheWeek(tweet) {
  if (_isReply(tweet) == false) {
    console.log(tweet.text);
    const lowercaseTweet = tweet.text.toLowerCase();
    if (lowercaseTweet.includes('coin of the week')) {
      return true;
    }
  }
  return false;
}

// Filter out reply tweets
function _isReply(tweet) {
  if ( tweet.retweeted_status
    || tweet.in_reply_to_status_id
    || tweet.in_reply_to_status_id_str
    || tweet.in_reply_to_user_id
    || tweet.in_reply_to_user_id_str
    || tweet.in_reply_to_screen_name ) {
    return true;
  }
  return false;
}

if (process.env.NODE_ENV != 'test') {
  module.exports = { coinEmitter };
} else {
  module.exports = { coinEmitter, _coinOfTheWeek, _imageUrl, _emitCoin };  
}
