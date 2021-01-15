"use strict";

const createDebugger = require('debug');

const PATH = '/walletAddresses';
const debug = createDebugger('just-mining:v1:walletAddresses');

function getWalletAddress(axios, currencyCode, id) {
  if (!currencyCode) {
    throw new Error('Missing required currencyCode parameter.');
  } else if (typeof currencyCode !== 'string') {
    throw new Error('Parameter currencyCode must be a string');
  }

  if (!id) {
    throw new Error('Missing required id parameter.');
  } else if (isNaN(id)) {
    throw new Error('Parameter id must be a number');
  }

  debug('get wallet address with id', id, 'for currency', currencyCode);
  const url = `${PATH}/${currencyCode}/${id}`;
  debug('call api at', url);
  return axios.get(url).then(response => {
    debug('got api response');
    return response.data.data;
  }).catch(error => {
    var _error$response;

    debug('got an error', error);

    if (((_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 404) {
      throw new Error(`Wallet address #${id} for currency ${currencyCode} was not found.`);
    }

    throw new Error(`An error occurred: ${error.message}.`);
  });
}

function listWalletAddresses(axios, currencyCode) {
  debug('list wallet addresses', currencyCode ? `for currencyCode ${currencyCode}` : '');
  let url = PATH;

  if (currencyCode && typeof currencyCode !== 'string') {
    throw new Error('Parameter currencyCode must be a string');
  } else if (currencyCode) {
    url = `${PATH}/${currencyCode}`;
  }

  debug('call api at', url);
  return axios.get(url).then(response => {
    debug('got api response');
    return response.data.data;
  }).catch(error => {
    var _error$response2;

    debug('got an error', error);

    if (((_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.status) === 404) {
      if (currencyCode) {
        throw new Error(`Wallet addresses for currency ${error.currencyCode} were not found.`);
      }

      throw new Error('No wallet addresses were found');
    }

    throw new Error(`An error occurred: ${error.message}`);
  });
}

module.exports = function (axios) {
  return {
    list: listWalletAddresses.bind(null, axios),
    get: getWalletAddress.bind(null, axios)
  };
};