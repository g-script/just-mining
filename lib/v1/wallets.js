"use strict";

const createDebugger = require('debug');

const PATH = '/wallets';
const debug = createDebugger('just-mining:v1:wallets');

function getWallet(axios, currencyCode) {
  debug('get wallet for currencyCode', currencyCode);

  if (!currencyCode) {
    throw new Error('Missing required currencyCode parameter.');
  } else if (typeof currencyCode !== 'string') {
    throw new Error('Parameter currencyCode must be a number');
  }

  const url = `${PATH}/${currencyCode}`;
  debug('call api at', url);
  return axios.get(url).then(response => {
    debug('got api response');
    return response.data.data;
  }).catch(error => {
    var _error$response;

    debug('got an error', error);

    if (((_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 404) {
      throw new Error(`Wallet for currency ${currencyCode} was not found.`);
    }

    throw new Error(`An error occurred: ${error.message}`);
  });
}

function listWallets(axios) {
  debug('list wallets');
  debug('call api at', PATH);
  return axios.get(PATH).then(response => {
    debug('got api response');
    return response.data.data;
  }).catch(error => {
    var _error$response2;

    debug('got an error', error);

    if (((_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.status) === 404) {
      throw new Error('No wallet were found.');
    }

    throw new Error(`An error occurred: ${error.message}.`);
  });
}

module.exports = function (axios) {
  return {
    list: listWallets.bind(null, axios),
    get: getWallet.bind(null, axios)
  };
};