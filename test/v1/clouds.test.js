/* global describe, it */
const expectations = {
  all: [{
    id: 571,
    status: 'inactive',
    startDate: false,
    expirationDate: 1535932800,
    hashrate: 1000000,
    currencyCode: 'ETC',
    mined: {
      ETH: 0.05191667,
      ZEC: 0.00160224,
      ETC: 0.09365148
    }
  }, {
    id: 6904,
    status: 'active',
    startDate: false,
    expirationDate: 1653682867,
    hashrate: 100000000,
    currencyCode: 'GRIN',
    mined: {
      GRIN: 0.19518281
    }
  }],
  get: {
    id: 571,
    status: 'inactive',
    startDate: false,
    expirationDate: 1535932800,
    hashrate: 1000000,
    currencyCode: 'ETC',
    mined: {
      ETH: 0.05191667,
      ZEC: 0.00160224,
      ETC: 0.09365148
    }
  }
}

exports = module.exports = function cloudsTests (client, expect) {
  describe('cloud contracts', () => {
    it('list all contracts', () => {
      return expect(client.api.clouds.list())
        .to.eventually.deep.equal(expectations.all)
    })

    it('get a specific contract', () => {
      return expect(client.api.clouds.get(571))
        .to.eventually.deep.equal(expectations.get)
    })

    it('fails to get an unknown contract', () => {
      return expect(client.api.clouds.get(12345))
        .to.be.rejected
    })
  })
}

exports.expectations = expectations
