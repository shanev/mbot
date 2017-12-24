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
