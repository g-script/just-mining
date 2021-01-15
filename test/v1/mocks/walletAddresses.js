module.exports = (nock) => {
  nock.get('/walletAddresses').reply(200, {
    success: true,
    data: [{
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
    }]
  }).get('/walletAddresses/ETH').reply(200, {
    success: true,
    data: [{
      id: 11401,
      currencyCode: 'ETH',
      name: null,
      address: '0x............................',
      isBEP2: false,
      memo: null
    }]
  }).get('/walletAddresses/BNB/11402').reply(200, {
    success: true,
    data: {
      id: 11402,
      currencyCode: 'BNB',
      name: null,
      address: 'bnb.....................',
      isBEP2: true,
      memo: 'memo'
    }
  }).get('/walletAddresses/ABCDEF/12345').reply(404, {
    success: false,
    error: {
      code: 404,
      message: 'RESSOURCE_NOT_FOUND'
    }
  })
}
