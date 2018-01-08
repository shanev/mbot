# McAfee 'Coin of the Week' Bot

MBot retrieves the symbol and coinmarketcap.com URL for [@officialmcafee's](https://twitter.com/officialmcafee) 'Coin of the Week', and automatically buys it on an exchange, currently only Bittrex. It uses OCR to extract the coin information from the image embedded in McAfee's tweet.

## **WARNING**

**This tool trades with real money. The author is not responsible for irresponsible usage. Run in a secure environment to prevent exchange keys from being compromised.**

## Install

```
git clone https://github.com/shanev/mbot.git
cd mbot && npm install
```

## Setup

Add a .env file with API keys. Bittrex permissions have to be set to _trade limit_ under Settings -> API Keys. Google [credentials](https://cloud.google.com/docs/authentication/getting-started) are needed to do OCR on the tweet using Google's Cloud Vision API. Base64 encode the keyfile into `GOOGLE_API_KEY_ENCODED`.

```
TWITTER_CONSUMER_KEY=xxx
TWITTER_CONSUMER_SECRET=xxx
TWITTER_ACCESS_TOKEN_KEY=xxx
TWITTER_ACCESS_TOKEN_SECRET=xxx
BITTREX_API_KEY=xxx
BITTREX_API_SECRET=xxx
GOOGLE_API_KEY_ENCODED=xxx
```

## Run

Buy $100 USD of tweeted symbol on Bittrex. Make sure you have sufficient BTC or ETH for the trade. If a coin has both BTC and ETH markets, it uses the BTC market.

`npm start 100.00`

## Output

```
McAfee mentioned BTC.
https://coinmarketcap.com/currencies/bitcoin
```

## Advanced

MBot emits an event with the coin symbol and `tickerId` when it detects a new coin of the week. `tickerId` can be used to construct a coinmarketcap.com URL.

Usage:

```
const coinEmitter = Tweets.coinEmitter;
coinEmitter.on('data', (coin) => {
    console.log(coin.symbol);
    console.log(coin.tickerId); // https://coinmarketcap.com/currencies/[tickerId]
});
```

## Tests

`npm test`

```
  CoinMarketCap API
    findTickerIdBySymbol
      ✓ should find ticker id for FTC (229ms)
      ✓ should not find ticker id for SHANE (169ms)

  Tweets
    _coinOfTheWeek()
      ✓ should return true
      ✓ should return false
    _imageUrl()
      ✓ should return a url for tweet
      ✓ should return null for bad tweet
    CoinEmitter
      ✓ should emit a symbol

  Vision
    detectSymbol
      ✓ should detect symbol for TRON (1263ms)
      ✓ should detect symbol for Factom (1288ms)
      ✓ should detect symbol for Dodge (986ms)


  10 passing (4s)
```
