/* eslint-disable */
const apis = {
  v1: require('./v1')
}

module.exports = class JustMiningClient {
  /**
   * Create a client exposing Just Mining API as functions
   * @param {Object} options Constructor options
   * @param {String} [options.version] API version
   * @param {String} options.apiKey Account API key
   */
  constructor (options) {
    const opts = {
      version: 'v1',
      ...options
    }

    if (typeof opts.version !== 'string' || !Object.keys(apis).includes(opts.version)) {
      throw new Error(`Invalid version provided: ${opts.version}. Supported versions are: ${Object.keys(apis).join(', ')}.`)
    }

    if (!opts.apiKey || typeof opts.apiKey !== 'string') {
      throw new Error('Missing API key')
    }

    this.api = apis[opts.version](opts.apiKey)
  }

  /**
   * Convenience method to "aggregate" multiple resources through one call
   * @param {Object|Array<String>|String} resources Resources to get
   * @returns {Object}
   */
  get (resources) {
    // Detect resources that were required
    if (resources === 'all') {
      resources = Object.keys(this.api).reduce((accumulator, value) => {
        accumulator[value] = 'all'

        return accumulator
      }, {})
    } else if (typeof resources === 'string') {
      resources = {
        [resources]: 'all'
      }
    } else if (Array.isArray(resources)) {
      resources = resources.reduce((accumulator, value) => {
        accumulator[value] = 'all'

        return accumulator
      }, {})
    }

    // Initiate array of call promises
    const calls = []
    // Initiate array tracking calls order
    const calledResources = []

    // Iterate over asked resources
    for (const resource in resources) {
      const getter = this.api[resource]

      if (!getter) {
        throw new Error(`Unknown resource provided: ${resource}. Valid resources are: ${Object.keys(this.api).join(', ')}.`)
      }

      if (resources[resource] === 'all') {
        // Simplest case, we ask for all elements of resource, just call list()
        calls.push(getter.list())
        calledResources.push(resource)
      } else {
        // Trickier case, we asked for specific elements of resource
        let params = resources[resource]
        
        // Consider it’s an array of param
        if (!Array.isArray(params)) {
          params = [params]
        }

        // Iterate over asked parameters
        for (const param of params) {
          // All resources do not share same way of being handled
          switch (resource) {
            case 'walletAddresses':
              // Wallet addresses have multiple parameters, but will always be either an array or an object
              if (param.currencyCode && param.id) {
                calls.push(getter.get(param.currencyCode, param.id))
              } else if (param.currencyCode) {
                calls.push(getter.list(param.currencyCode))
              } else {
                throw new Error(`Invalid parameter given to ${resource}: ${param}`)
              }

              calledResources.push(resource)

              break
            case 'hardwares':
              // Hardwares have also multiple parameters, but it is always an object with [type] keys
              if (param.type && param.id) {
                calls.push(getter.get(param.type, param.id))
              } else if (param.type) {
                calls.push(getter.list(param.type))
              } else {
                throw new Error(`Invalid parameters given to ${resource}: ${param}`)
              }

              // We track asked subresource
              calledResources.push(`${resource}.${param.type}`)

              break
            default:
              // Default case, all parameter is a listing, if other, it’s a get
              if (param === 'all') {
                calls.push(getter.list())
              } else {
                calls.push(getter.get(param))
              }

              calledResources.push(resource)
              
              break
          }
        }
      }
    }

    // Execute all calls, without worrying of errors (they will be thrown to consumer directly)
    return Promise.all(calls).then((callResults) => {
      // Reduce results array into an object holding resources as keys
      return callResults.reduce((accumulator, value, index) => {
        const [resource,subResource] = [...calledResources][index].split('.')
        
        // Handle subresource case (for hardwares resource only)
        if (subResource) {
          // Create an empty object representing resource
          if (!accumulator[resource]) {
            accumulator[resource] = {}
          }

          // Treat value as an array
          if (!Array.isArray(value)) {
            value = [value]
          }

          // Create default empty array for subresource
          if (!accumulator[resource][subResource]) {
            accumulator[resource][subResource] = []
          }

          // Add result to subresource results
          accumulator[resource][subResource] = accumulator[resource][subResource].concat(value)
        } else {
          // Always treat results as an array (if it is not hardwares resource)
          if (!accumulator[resource] && resource !== 'hardwares') {
            accumulator[resource] = []
          }

          if (resource !== 'hardwares') {
            // Add result to resource results
            accumulator[resource] = accumulator[resource].concat(value)
          } else {
            // Just add result value in case of hardwares resource (e.g. asked for all hardwares)
            accumulator[resource] = value
          }
        }

        return accumulator
      }, {})
    })
  }
}
