require('dotenv').config();

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

 // shanev: 6068692
 // officialmcafee: 961445378
client.stream('statuses/filter', {follow: '961445378'},  function(stream) {
  stream.on('data', function(tweet) {
    if (isReply(tweet) == false) {
      console.log(tweet.text);
      const match = tweet.match(/[A-Z0-9]{3,5}/);
      if (match != null) {
        const symbol = match[0];
        console.log('Found ${symbol}.')
        // search coinmarketcap, find symbol
        // https://api.coinmarketcap.com/v1/ticker/?limit=0
        // [
        //     {
        //         "id": "bitcoin", 
        //         "name": "Bitcoin", 
        //         "symbol": "BTC", 
        //         "rank": "1", 
        //         "price_usd": "13767.0", 
        //         "price_btc": "1.0", 
        //         "24h_volume_usd": "12892600000.0", 
        //         "market_cap_usd": "230729578404", 
        //         "available_supply": "16759612.0", 
        //         "total_supply": "16759612.0", 
        //         "max_supply": "21000000.0", 
        //         "percent_change_1h": "-2.67", 
        //         "percent_change_24h": "-4.78", 
        //         "percent_change_7d": "-29.21", 
        //         "last_updated": "1514084956"
        //     }, 
      }
    }
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});

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
