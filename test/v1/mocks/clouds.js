module.exports = (nock) => {
  nock.get('/clouds').reply(200, {
    success: true,
    data: [
      {
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
      },
      {
        id: 6904,
        status: 'active',
        startDate: false,
        expirationDate: 1653682867,
        hashrate: 100000000,
        currencyCode: 'GRIN',
        mined: {
          GRIN: 0.19518281
        }
      }
    ]
  }).get('/clouds/571').reply(200, {
    success: true,
    data: {
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
  }).get('/clouds/12345').reply(404, {
    success: false,
    error: {
      code: 404,
      message: 'RESSOURCE_NOT_FOUND'
    }
  })
}
