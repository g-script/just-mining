/* eslint-disable */
const axios = require('axios')

module.exports = (apiKey) => {
  const instance = axios.create({
    baseURL: 'https://api.just-mining.com/v1',
    headers: {
      'API-KEY': apiKey
    }
  })

  return {
    clouds: require('./clouds')(instance),
    hardwares: require('./hardwares')(instance),
    masternodes: require('./masternodes')(instance),
    operations: require('./operations')(instance),
    stakings: require('./stakings')(instance),
    wallets: require('./wallets')(instance),
    walletAddresses: require('./walletAddresses')(instance)
  }
}
