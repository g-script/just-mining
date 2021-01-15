const nock = require('nock')

const scope = nock('https://api.just-mining.com/v1', {
  reqheaders: {
    'API-KEY': /[a-f\d]+/
  }
}).persist()

require('./clouds')(scope)
require('./hardwares')(scope)
require('./masternodes')(scope)
require('./operations')(scope)
require('./stakings')(scope)
require('./wallets')(scope)
require('./walletAddresses')(scope)
