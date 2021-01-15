/* global describe, it */
const expectations = {
  all: [{
    id: 11401,
    currencyCode: 'ETH',
    name: null,
    address: '0x............................',
    isBEP2: false,
    memo: null
  }, {
    id: 11402,
    currencyCode: 'BNB',
    name: null,
    address: 'bnb.....................',
    isBEP2: true,
    memo: 'memo'
  }],
  listForCurrency: [{
    id: 11401,
    currencyCode: 'ETH',
    name: null,
    address: '0x............................',
    isBEP2: false,
    memo: null
  }],
  get: {
    id: 11402,
    currencyCode: 'BNB',
    name: null,
    address: 'bnb.....................',
    isBEP2: true,
    memo: 'memo'
  }
}

exports = module.exports = function walletAddressesTests (client, expect) {
  describe('wallet addresses', () => {
    it('list all addresses', () => {
      return expect(client.api.walletAddresses.list())
        .to.eventually.deep.equal(expectations.all)
    })

    it('list addresses for currency', () => {
      return expect(client.api.walletAddresses.list('ETH'))
        .to.eventually.deep.equal(expectations.listForCurrency)
    })

    it('get a specific address', () => {
      return expect(client.api.walletAddresses.get('BNB', 11402))
        .to.eventually.deep.equal(expectations.get)
    })

    it('fails to get an unknown address', () => {
      return expect(client.api.walletAddresses.get('ABCDEF', 12345))
        .to.be.rejected
    })
  })
}

exports.expectations = expectations
