module.exports = function testsV1 (JM, expect) {
  return function mochaSuite () {
    const client = new JM({
      apiKey: process.env.API_KEY
    })

    require('./mocks')
    require('./clouds.test')(client, expect)
    require('./hardwares.test')(client, expect)
    require('./masternodes.test')(client, expect)
    require('./operations.test')(client, expect)
    require('./stakings.test')(client, expect)
    require('./wallets.test')(client, expect)
    require('./walletAddresses.test')(client, expect)
    require('./get.test')(client, expect)
  }
}
