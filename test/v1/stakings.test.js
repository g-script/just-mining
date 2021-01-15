/* global describe, it */
const expectations = {
  all: [{
    currencyCode: 'KAVA',
    amount: 75,
    reward: 0.01027898,
    lockedReward: 0,
    startDate: 1590582716,
    variations: [
      {
        amount: 75,
        date: 1590582716,
        effectiveDate: 1590669116,
        applied: 1
      }
    ],
    credits: [
      {
        amount: 0.00432936,
        date: 1590710400,
        releaseDate: false,
        released: 1
      },
      {
        amount: 0.00594962,
        date: 1590624000,
        releaseDate: false,
        released: 1
      }
    ]
  }, {
    currencyCode: 'SNX',
    amount: 500,
    reward: 0,
    lockedReward: 0,
    startDate: 1590594695,
    variations: [
      {
        amount: 500,
        date: 1590594695,
        effectiveDate: 1590681095,
        applied: 1
      }
    ],
    credits: []
  }],
  get: {
    currencyCode: 'KAVA',
    amount: 75,
    reward: 0.01027898,
    lockedReward: 0,
    startDate: 1590582716,
    variations: [
      {
        amount: 75,
        date: 1590582716,
        effectiveDate: 1590669116,
        applied: 1
      }
    ],
    credits: [
      {
        amount: 0.00432936,
        date: 1590710400,
        releaseDate: false,
        released: 1
      },
      {
        amount: 0.00594962,
        date: 1590624000,
        releaseDate: false,
        released: 1
      }
    ]
  }
}

exports = module.exports = function stakingsTests (client, expect) {
  describe('staking contracts', function stakingsSuite () {
    it('list all contracts', function listTest () {
      return expect(client.api.stakings.list())
        .to.eventually.deep.equal(expectations.all)
    })

    it('get contract for currency', function getTest () {
      return expect(client.api.stakings.get('KAVA'))
        .to.eventually.deep.equal(expectations.get)
    })

    it('fails to get an unknown contract', function failTest () {
      return expect(client.api.stakings.get('ABCDEF'))
        .to.be.rejected
    })
  })
}

exports.expectations = expectations
