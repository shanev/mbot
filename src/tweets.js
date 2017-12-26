require('dotenv').config();

const axios = require('axios');
const Twitter = require('twitter');
const CoinMktCapApi = require('./coinmktcap');
const Bittrex = require('./bittrex');

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

client.stream('statuses/filter', {follow: '961445378'}, (stream) => {
  stream.on('data', async (tweet) => {
    const symbol = coinOfTheDay(tweet);
    if (symbol != null) {
      console.log('McAfee mentioned ${symbol}.');
      const tickerId = await CoinMktCapApi.findTickerIdBySymbol(symbol);
      if (tickerId != null) {
        console.log('https://coinmarketcap.com/currencies/${tickerId}');
        await Bittrex.buy(symbol, parseFloat(tradePice));
      } else {
        console.log('Not listed on CoinMarketCap.');
      }      
    }
  });

  stream.on('error', (error) => {
    console.log(error);
  });
});

// Coin of the day, or null
function coinOfTheDay(tweet) {
  if (isReply(tweet) == false) {
    console.log(tweet.text);
    const lowercaseTweet = tweet.text.toLowerCase();
    if (lowercaseTweet.includes('coin of the day')) {
      const match = tweet.text.match(/[A-Z0-9]{3,5}/);
      if (match != null) {
        return match[0];
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  return null;
}

// Filter out reply tweets
function isReply(tweet) {
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

module.exports = { coinOfTheDay };
