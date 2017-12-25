require('dotenv').config();

const bittrex = require('node-bittrex-api');

bittrex.options({
  'apikey': process.env.BITTREX_API_KEY,
  'apisecret': process.env.BITTREX_API_SECRET,
});

bittrex.getorderbook({ market: 'BTC-OMG', depth: 10, type: 'both' }, function(data, err) {
  console.log(data);
});
