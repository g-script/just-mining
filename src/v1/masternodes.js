const createDebugger = require('debug')

const PATH = '/masternode'
const debug = createDebugger('just-mining:v1:masternodes')

function getMasternode (axios, id) {
  debug('get masternode with id', id)

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
      throw new Error(`Masternode #${id} was not found.`)
    }

    throw new Error(`An error occurred: ${error.message}`)
  })
}

function listMasternodes (axios) {
  debug('list masternodes')

  const path = `${PATH}s`

  debug('call api at', path)

  return axios.get(path).then((response) => {
    debug('got api response')

    return response.data.data
  }).catch((error) => {
    debug('got an error', error)

    if (error.response?.status === 404) {
      throw new Error('No masternodes were found.')
    }

    throw new Error(`An error occurred: ${error.message}.`)
  })
}

module.exports = function (axios) {
  return {
    list: listMasternodes.bind(null, axios),
    get: getMasternode.bind(null, axios)
  }
}
