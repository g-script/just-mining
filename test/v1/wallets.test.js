/* global describe, it */
const expectations = {
  all: [{
    currencyCode: 'ZEC',
    balance: 0.00160223
  }, {
    currencyCode: 'ETH',
    balance: 0.03190596
  }, {
    currencyCode: 'ETC',
    balance: 0.09259209
  }],
  get: {
    currencyCode: 'ETH',
    balance: 0.03190596
  }
}

exports = module.exports = function walletsTests (client, expect) {
  describe('wallets', () => {
    it('list all wallets', () => {
      return expect(client.api.wallets.list())
        .to.eventually.deep.equal(expectations.all)
    })

    it('get wallet for currency', () => {
      return expect(client.api.wallets.get('ETH'))
        .to.eventually.deep.equal(expectations.get)
    })

    it('fails to get an unknown wallet', () => {
      return expect(client.api.wallets.get('ABCDEF'))
        .to.be.rejected
    })
  })
}

exports.expectations = expectations
