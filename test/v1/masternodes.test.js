/* global describe, it */
const expectations = {
  all: [{
    id: 9208,
    status: 'active',
    collateral: 250,
    currencyCode: 'BITG',
    reward: 0.00149775,
    startDate: 1590739635,
    endDate: null
  }, {
    id: 9224,
    status: 'active',
    collateral: 4.2,
    currencyCode: 'ZEN-42',
    reward: 0.00001253,
    startDate: 1590739640,
    endDate: null
  }],
  get: {
    id: 9208,
    status: 'active',
    collateral: 250,
    currencyCode: 'BITG',
    reward: 0.00149775,
    startDate: 1590739635,
    endDate: null
  }
}

exports = module.exports = function masternodesTests (client, expect) {
  describe('masternodes', () => {
    it('list all masternodes', () => {
      return expect(client.api.masternodes.list())
        .to.eventually.deep.equal(expectations.all)
    })

    it('get a specific masternode', () => {
      return expect(client.api.masternodes.get(9208))
        .to.eventually.deep.equal(expectations.get)
    })

    it('fails to get an unknown masternode', () => {
      return expect(client.api.masternodes.get(12345))
        .to.be.rejected
    })
  })
}

exports.expectations = expectations
