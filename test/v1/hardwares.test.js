/* global describe, it */
const expectations = {
  all: {
    asics: [{
      id: 330,
      type: 'S17+',
      status: 'active',
      hashrate: 36270000000000,
      currencyCode: 'BTC',
      uptime: 71640,
      mined: {
        BTC: 0.02070824
      }
    }],
    bobs: [{
      serial: 580099,
      status: 'inactive',
      uptime: '285',
      lastActivity: 1568986845,
      hashrate: 175260000,
      currencyCode: 'ETH',
      mined: {
        ETH: 5.00003053
      }
    }]
  },
  listBobs: [{
    serial: 580099,
    status: 'inactive',
    uptime: '285',
    lastActivity: 1568986845,
    hashrate: 175260000,
    currencyCode: 'ETH',
    mined: {
      ETH: 5.00003053
    }
  }],
  getBob: {
    serial: 580099,
    status: 'inactive',
    uptime: '285',
    lastActivity: 1568986845,
    hashrate: 175260000,
    currencyCode: 'ETH',
    mined: {
      ETH: 0.00003053
    }
  },
  getAsic: {
    id: 330,
    type: 'S17+',
    status: 'active',
    hashrate: 36270000000000,
    currencyCode: 'BTC',
    uptime: 71640,
    mined: {
      BTC: 0.02070824
    }
  }
}

exports = module.exports = function hardwaresTests (client, expect) {
  describe('hardwares', function hardwaresSuite () {
    it('list all hardwares', function listTest () {
      return expect(client.api.hardwares.list())
        .to.eventually.deep.equal(expectations.all)
    })

    it('list all bobs', function listBobsTest () {
      return expect(client.api.hardwares.list('bobs'))
        .to.eventually.deep.equal(expectations.listBobs)
    })

    it('get a specific bob', function getBobTest () {
      return expect(client.api.hardwares.get('bobs', 580099))
        .to.eventually.deep.equal(expectations.getBob)
    })

    it('get a specific asic', function getAsicTest () {
      return expect(client.api.hardwares.get('asics', 330))
        .to.eventually.deep.equal(expectations.getAsic)
    })

    it('fails to get an unknown bob', function failBobTest () {
      return expect(client.api.hardwares.get('bobs', 12345))
        .to.be.rejected
    })

    it('fails to get an unknown asic', function failAsicTest () {
      return expect(client.api.hardwares.get('asics', 12345))
        .to.be.rejected
    })
  })
}

exports.expectations = expectations
