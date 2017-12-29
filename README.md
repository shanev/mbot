# McAfee 'Coin of the Week' Bot

Retrieves the coinmarketcap.com URL for McAfee's 'Coin of the Week', and buys it on Bittrex.

## **WARNING**

**This tool trades with real money. The author is not responsible for irresponsible usage. Run in a secure environment to prevent exchange keys from being compromised.**

## Install

```
git clone https://github.com/shanev/mbot.git
cd mbot && npm install
```

## Setup

Add a .env file with API keys. Bittrex permissions have to be set to _trade limit_ under Settings -> API Keys. Google [credentials](https://cloud.google.com/docs/authentication/getting-started) are needed to do OCR on the tweet using Google's Cloud Vision API.

```
TWITTER_CONSUMER_KEY=xxx
TWITTER_CONSUMER_SECRET=xxx
TWITTER_ACCESS_TOKEN_KEY=xxx
TWITTER_ACCESS_TOKEN_SECRET=xxx
BITTREX_API_KEY=xxx
BITTREX_API_SECRET=xxx
GOOGLE_APPLICATION_CREDENTIALS=xxx
```

## Run

Buy $100 USD of tweeted symbol on Bittrex. Make sure you have sufficient BTC or ETH for the trade. If a coin has both BTC and ETH markets, it uses the BTC market.

`npm start 100.00`

## Output

```
McAfee mentioned BTC.
https://coinmarketcap.com/currencies/bitcoin
```
