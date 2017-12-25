# McAfee 'Coin of the Day' Bot

## Install

```
git clone https://github.com/shanev/mbot.git
cd mbot && npm install
```

## Setup

Add a .env file with API keys

```
TWITTER_CONSUMER_KEY=xxx
TWITTER_CONSUMER_SECRET=xxx
TWITTER_ACCESS_TOKEN_KEY=xxx
TWITTER_ACCESS_TOKEN_SECRET=xxx
BITTREX_API_KEY=xxx
BITTREX_API_SECRET=xxx
```

## Run

Buy $100 USD of tweeted symbol on Bittrex. Make sure you have sufficient BTC or ETH for the trade. If a coin has both BTC and ETH markets, it uses the BTC market.

`npm start 100.00`

## Output

```
McAfee mentioned BTC.
https://coinmarketcap.com/currencies/bitcoin
```
