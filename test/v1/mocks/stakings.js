module.exports = (nock) => {
  nock.get('/stakings').reply(200, {
    success: true,
    data: [
      {
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
      },
      {
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
      }
    ]
  }).get('/stakings/KAVA').reply(200, {
    success: true,
    data: {
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
  }).get('/stakings/ABCDEF').reply(404, {
    success: false,
    error: {
      code: 404,
      message: 'RESSOURCE_NOT_FOUND'
    }
  })
}
