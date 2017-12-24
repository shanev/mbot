require('dotenv').config();
var Twitter = require('twitter');

// var client = new Twitter({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   bearer_token: process.env.TWITTER_BEARER_TOKEN
// });

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/
client.stream('statuses/filter', {follow: '961445378'},  function(stream) {
  stream.on('data', function(tweet) {
    if (isReply(tweet) == false) {
      console.log('REAL ' + tweet.text);
    } else {
      console.log('REPLY ' + tweet.text);
    }
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});

// client.get('statuses/user_timeline', {screen_name: 'officialmcafee'}, function(error, tweets, response) {
//   if (!error) {
//     for (var i = 0; i < tweets.length ; i++) {
//       console.log(tweets[i].text);
//     }
//   }
// });

// does not work
// client.stream('statuses/user_timeline', {screen_name: 'officialmcafee'}, function(stream) {
//   stream.on('data', function(tweet) {
//     console.log(tweet.text);
//   });

//   stream.on('error', function(error) {
//     console.log(error);
//   });
// });

function isReply(tweet) {
  if ( tweet.retweeted_status
    || tweet.in_reply_to_status_id
    || tweet.in_reply_to_status_id_str
    || tweet.in_reply_to_user_id
    || tweet.in_reply_to_user_id_str
    || tweet.in_reply_to_screen_name )
    return true
}
