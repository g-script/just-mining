const createDebugger = require('debug')

const PATH = '/clouds'
const debug = createDebugger('just-mining:v1:clouds')

function getCloudContract (axios, id) {
  debug('get cloud contract with id', id)

  if (!id) {
    throw new Error('Missing required id parameter.')
  } else if (isNaN(id)) {
    throw new Error('Parameter id must be a number')
  }

  const url = `${PATH}/${id}`

  debug('call api at', url)

  return axios.get(url).then((response) => {
    debug('got api response')

    return response.data.data
  }).catch((error) => {
    debug('got an error', error)

    if (error.response?.status === 404) {
      throw new Error(`Cloud contract #${id} was not found.`)
    }

    throw new Error(`An error occurred: ${error.message}`)
  })
}

function listCloudContracts (axios) {
  debug('list cloud contracts')
  debug('call api at', PATH)

  return axios.get(PATH).then((response) => {
    debug('got api response')

    return response.data.data
  }).catch((error) => {
    debug('got an error', error)

    if (error.response?.status === 404) {
      throw new Error('No cloud contracts were found.')
    }

    throw new Error(`An error occurred: ${error.message}.`)
  })
}

module.exports = function (axios) {
  return {
    list: listCloudContracts.bind(null, axios),
    get: getCloudContract.bind(null, axios)
  }
}
