"use strict";

const createDebugger = require('debug');

const PATH = '/operations';
const debug = createDebugger('just-mining:v1:operations');

function getOperation(axios, id) {
  debug('get operation with id', id);

  if (!id) {
    throw new Error('Missing required id parameter.');
  } else if (isNaN(id)) {
    throw new Error('Parameter id must be a number');
  }

  const url = `${PATH}/${id}`;
  debug('call api at', url);
  return axios.get(url).then(response => {
    debug('got api response');
    return response.data.data;
  }).catch(error => {
    var _error$response;

    debug('got an error', error);

    if (((_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 404) {
      throw new Error(`Operation #${id} was not found.`);
    }

    throw new Error(`An error occurred: ${error.message}`);
  });
}

function listOperations(axios) {
  debug('list operations');
  debug('call api at', PATH);
  return axios.get(PATH).then(response => {
    debug('got api response');
    return response.data.data;
  }).catch(error => {
    var _error$response2;

    debug('got an error', error);

    if (((_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.status) === 404) {
      throw new Error('No operations were found.');
    }

    throw new Error(`An error occurred: ${error.message}.`);
  });
}

module.exports = function (axios) {
  return {
    list: listOperations.bind(null, axios),
    get: getOperation.bind(null, axios)
  };
};