module.exports = (nock) => {
  nock.get('/wallets').reply(200, {
    success: true,
    data: [
      {
        currencyCode: 'ZEC',
        balance: 0.00160223
      },
      {
        currencyCode: 'ETH',
        balance: 0.03190596
      },
      {
        currencyCode: 'ETC',
        balance: 0.09259209
      }
    ]
  }).get('/wallets/ETH').reply(200, {
    success: true,
    data: {
      currencyCode: 'ETH',
      balance: 0.03190596
    }
  }).get('/wallets/ABCDEF').reply(404, {
    success: false,
    error: {
      code: 404,
      message: 'RESSOURCE_NOT_FOUND'
    }
  })
}
