/* global describe, it */
const expectations = {
  walletAddresses: require('./walletAddresses.test').expectations,
  clouds: require('./clouds.test').expectations,
  hardwares: require('./hardwares.test').expectations,
  masternodes: require('./masternodes.test').expectations,
  operations: require('./operations.test').expectations,
  stakings: require('./stakings.test').expectations,
  wallets: require('./wallets.test').expectations
}

module.exports = function getTests (client, expect) {
  describe('get', function getSuite () {
    it('all', function stringParamTest () {
      return expect(client.get('all'))
        .to.eventually.deep.equal({
          walletAddresses: expectations.walletAddresses.all,
          clouds: expectations.clouds.all,
          hardwares: expectations.hardwares.all,
          masternodes: expectations.masternodes.all,
          operations: expectations.operations.all,
          stakings: expectations.stakings.all,
          wallets: expectations.wallets.all
        })
    })

    it('string param', function stringParamTest () {
      return expect(client.get('walletAddresses'))
        .to.eventually.deep.equal({
          walletAddresses: expectations.walletAddresses.all
        })
    })

    it('array param with single value', function arrayParamSingleTest () {
      return expect(client.get(['hardwares']))
        .to.eventually.deep.equal({
          hardwares: expectations.hardwares.all
        })
    })

    it('array param with multiple values', function arrayParamMultipleTest () {
      return expect(client.get(['hardwares', 'stakings']))
        .to.eventually.deep.equal({
          hardwares: expectations.hardwares.all,
          stakings: expectations.stakings.all
        })
    })

    it('object param with single key', function objectParamSingleTest () {
      return expect(client.get({
        hardwares: [{
          type: 'asics',
          id: 330
        }, {
          type: 'bobs'
        }]
      })).to.eventually.deep.equal({
        hardwares: {
          bobs: expectations.hardwares.listBobs,
          asics: [expectations.hardwares.getAsic]
        }
      })
    })

    it('object param with multiple keys', function objectParamMultipleTest () {
      return expect(client.get({
        hardwares: [{
          type: 'asics',
          id: 330
        }, {
          type: 'bobs'
        }],
        stakings: 'KAVA'
      })).to.eventually.deep.equal({
        hardwares: {
          bobs: expectations.hardwares.listBobs,
          asics: [expectations.hardwares.getAsic]
        },
        stakings: [expectations.stakings.get]
      })
    })
  })
}
