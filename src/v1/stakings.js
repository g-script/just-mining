const createDebugger = require('debug')

const PATH = '/stakings'
const debug = createDebugger('just-mining:v1:stakings')

function getStakingContract (axios, currencyCode) {
  debug('get staking contract for currencyCode', currencyCode)

  if (!currencyCode) {
    throw new Error('Missing required currencyCode parameter.')
  } else if (typeof currencyCode !== 'string') {
    throw new Error('Parameter currencyCode must be a number')
  }

  const url = `${PATH}/${currencyCode}`

  debug('call api at', url)

  return axios.get(url).then((response) => {
    debug('got api response')

    return response.data.data
  }).catch((error) => {
    debug('got an error', error)

    if (error.response?.status === 404) {
      throw new Error(`Staking contract for currency ${currencyCode} was not found.`)
    }

    throw new Error(`An error occurred: ${error.message}`)
  })
}

function listStakingContracts (axios) {
  debug('list staking contracts')
  debug('call api at', PATH)

  return axios.get(PATH).then((response) => {
    debug('got api response')

    return response.data.data
  }).catch((error) => {
    debug('got an error', error)

    if (error.response?.status === 404) {
      throw new Error('No staking contract were found.')
    }

    throw new Error(`An error occurred: ${error.message}.`)
  })
}

module.exports = function (axios) {
  return {
    list: listStakingContracts.bind(null, axios),
    get: getStakingContract.bind(null, axios)
  }
}
