"use strict";

const createDebugger = require('debug');

const VALID_TYPES = ['bobs', 'asics'];
const PATH = '/hardwares';
const debug = createDebugger('just-mining:v1:hardwares');

function getHardware(axios, type, id) {
  if (!type) {
    throw new Error('Missing required type parameter.');
  } else if (type && !VALID_TYPES.includes(type)) {
    throw new Error(`Parameter type must be one of: ${VALID_TYPES}`);
  }

  if (!id) {
    throw new Error('Missing required id parameter.');
  } else if (isNaN(id)) {
    throw new Error('Parameter id must be a number');
  }

  debug('get', type, 'with id', id);
  const url = `${PATH}/${type}/${id}`;
  debug('call api at', url);
  return axios.get(url).then(response => {
    debug('got api response');
    return response.data.data;
  }).catch(error => {
    var _error$response;

    debug('got an error', error);

    if (((_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 404) {
      throw new Error(`Hardware #${id} of type ${type} was not found.`);
    }

    throw new Error(`An error occurred: ${error.message}.`);
  });
}

function listHardwares(axios, type) {
  debug('list hardwares', type ? `of type ${type}` : '');
  let url = PATH;

  if (type && !VALID_TYPES.includes(type)) {
    throw new Error(`Parameter type must be one of: ${VALID_TYPES}`);
  } else if (type) {
    url = `${PATH}/${type}`;
  }

  debug('call api at', url);
  return axios.get(url).then(response => {
    debug('got api response');

    if (type) {
      var _response$data$data$t;

      return (_response$data$data$t = response.data.data[type]) !== null && _response$data$data$t !== void 0 ? _response$data$data$t : [];
    }

    return response.data.data;
  }).catch(error => {
    var _error$response2;

    debug('got an error', error);

    if (((_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.status) === 404) {
      if (type) {
        throw new Error(`Hardwares of type ${type} were not found.`);
      }

      throw new Error('No hardwares were found');
    }

    throw new Error(`An error occurred: ${error.message}`);
  });
}

module.exports = function (axios) {
  return {
    list: listHardwares.bind(null, axios),
    get: getHardware.bind(null, axios)
  };
};