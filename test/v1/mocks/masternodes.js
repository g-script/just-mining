module.exports = (nock) => {
  nock.get('/masternodes').reply(200, {
    success: true,
    data: [
      {
        id: 9208,
        status: 'active',
        collateral: 250,
        currencyCode: 'BITG',
        reward: 0.00149775,
        startDate: 1590739635,
        endDate: null
      },
      {
        id: 9224,
        status: 'active',
        collateral: 4.2,
        currencyCode: 'ZEN-42',
        reward: 0.00001253,
        startDate: 1590739640,
        endDate: null
      }
    ]
  }).get('/masternode/9208').reply(200, {
    success: true,
    data: {
      id: 9208,
      status: 'active',
      collateral: 250,
      currencyCode: 'BITG',
      reward: 0.00149775,
      startDate: 1590739635,
      endDate: null
    }
  }).get('/masternode/12345').reply(404, {
    success: false,
    error: {
      code: 412,
      message: 'RESSOURCE_NOT_FOUND'
    }
  })
}
