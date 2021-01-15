module.exports = (nock) => {
  nock.get('/operations').reply(200, {
    success: true,
    data: [
      {
        id: 3010,
        type: 'withdraw',
        status: 'paid',
        date: 1538914035,
        sourceCurrencyCode: 'ETH',
        sourceAmount: 3.7,
        destinationCurrencyCode: 'ETH',
        destinationAmount: 0,
        destinationAddress: '0x..................',
        memo: null
      },
      {
        id: 4027,
        type: 'withdraw',
        status: 'paid',
        date: 1537115656,
        sourceCurrencyCode: 'ETH',
        sourceAmount: 0.517,
        destinationCurrencyCode: 'ETH',
        destinationAmount: 0,
        destinationAddress: '0x....................',
        memo: null
      },
      {
        id: 5181,
        type: 'exchange',
        status: 'paid',
        date: 1536862720,
        sourceCurrencyCode: 'ZEC',
        sourceAmount: 0.00370617,
        destinationCurrencyCode: 'ETH',
        destinationAmount: 0.00233272
      },
      {
        id: 4522,
        type: 'credit',
        status: 'paid',
        date: 1532299229,
        currencyCode: 'BCARD',
        amount: 5,
        details: 'Masternode sale'
      }
    ]
  }).get('/operations/5412').reply(200, {
    success: true,
    data: {
      id: 5412,
      type: 'withdraw',
      status: 'paid',
      date: 1544977587,
      sourceCurrencyCode: 'ETC',
      sourceAmount: 1,
      destinationCurrencyCode: 'ETC',
      destinationAmount: 0,
      destinationAddress: '0x........................',
      memo: null
    }
  }).get('/operations/12345').reply(404, {
    success: false,
    error: {
      code: 404,
      message: 'RESSOURCE_NOT_FOUND'
    }
  })
}
