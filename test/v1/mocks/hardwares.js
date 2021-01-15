module.exports = (nock) => {
  nock.get('/hardwares').reply(200, {
    success: true,
    data: {
      asics: [
        {
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
      ],
      bobs: [
        {
          serial: 580099,
          status: 'inactive',
          uptime: '285',
          lastActivity: 1568986845,
          hashrate: 175260000,
          currencyCode: 'ETH',
          mined: {
            ETH: 5.00003053
          }
        }
      ]
    }
  }).get('/hardwares/bobs').reply(200, {
    success: true,
    data: {
      bobs: [
        {
          serial: 580099,
          status: 'inactive',
          uptime: '285',
          lastActivity: 1568986845,
          hashrate: 175260000,
          currencyCode: 'ETH',
          mined: {
            ETH: 5.00003053
          }
        }
      ]
    }
  }).get('/hardwares/bobs/580099').reply(200, {
    success: true,
    data: {
      serial: 580099,
      status: 'inactive',
      uptime: '285',
      lastActivity: 1568986845,
      hashrate: 175260000,
      currencyCode: 'ETH',
      mined: {
        ETH: 0.00003053
      }
    }
  }).get('/hardwares/bobs/12345').reply(404, {
    success: false,
    error: {
      code: 404,
      message: 'RESSOURCE_NOT_FOUND'
    }
  }).get('/hardwares/asics/330').reply(200, {
    success: true,
    data: {
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
  }).get('/hardwares/asics/12345').reply(404, {
    success: false,
    error: {
      code: 404,
      message: 'RESSOURCE_NOT_FOUND'
    }
  })
}
