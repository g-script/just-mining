"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable */
const apis = {
  v1: require('./v1')
};
module.exports = class JustMiningClient {
  /**
   * Create a client exposing Just Mining API as functions
   * @param {Object} options Constructor options
   * @param {String} [options.version] API version
   * @param {String} options.apiKey Account API key
   */
  constructor(options) {
    const opts = _objectSpread({
      version: 'v1'
    }, options);

    if (typeof opts.version !== 'string' || !Object.keys(apis).includes(opts.version)) {
      throw new Error(`Invalid version provided: ${opts.version}. Supported versions are: ${Object.keys(apis).join(', ')}.`);
    }

    if (!opts.apiKey || typeof opts.apiKey !== 'string') {
      throw new Error('Missing API key');
    }

    this.api = apis[opts.version](opts.apiKey);
  }
  /**
   * Convenience method to "aggregate" multiple resources through one call
   * @param {Object|Array<String>|String} resources Resources to get
   * @returns {Object}
   */


  get(resources) {
    // Detect resources that were required
    if (resources === 'all') {
      resources = Object.keys(this.api).reduce((accumulator, value) => {
        accumulator[value] = 'all';
        return accumulator;
      }, {});
    } else if (typeof resources === 'string') {
      resources = {
        [resources]: 'all'
      };
    } else if (Array.isArray(resources)) {
      resources = resources.reduce((accumulator, value) => {
        accumulator[value] = 'all';
        return accumulator;
      }, {});
    } // Initiate array of call promises


    const calls = []; // Initiate array tracking calls order

    const calledResources = []; // Iterate over asked resources

    for (const resource in resources) {
      const getter = this.api[resource];

      if (!getter) {
        throw new Error(`Unknown resource provided: ${resource}. Valid resources are: ${Object.keys(this.api).join(', ')}.`);
      }

      if (resources[resource] === 'all') {
        // Simplest case, we ask for all elements of resource, just call list()
        calls.push(getter.list());
        calledResources.push(resource);
      } else {
        // Trickier case, we asked for specific elements of resource
        let params = resources[resource]; // Consider it’s an array of param

        if (!Array.isArray(params)) {
          params = [params];
        } // Iterate over asked parameters


        var _iterator = _createForOfIteratorHelper(params),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            const param = _step.value;

            // All resources do not share same way of being handled
            switch (resource) {
              case 'walletAddresses':
                // Wallet addresses have multiple parameters, but will always be either an array or an object
                if (param.currencyCode && param.id) {
                  calls.push(getter.get(param.currencyCode, param.id));
                } else if (param.currencyCode) {
                  calls.push(getter.list(param.currencyCode));
                } else {
                  throw new Error(`Invalid parameter given to ${resource}: ${param}`);
                }

                calledResources.push(resource);
                break;

              case 'hardwares':
                // Hardwares have also multiple parameters, but it is always an object with [type] keys
                if (param.type && param.id) {
                  calls.push(getter.get(param.type, param.id));
                } else if (param.type) {
                  calls.push(getter.list(param.type));
                } else {
                  throw new Error(`Invalid parameters given to ${resource}: ${param}`);
                } // We track asked subresource


                calledResources.push(`${resource}.${param.type}`);
                break;

              default:
                // Default case, all parameter is a listing, if other, it’s a get
                if (param === 'all') {
                  calls.push(getter.list());
                } else {
                  calls.push(getter.get(param));
                }

                calledResources.push(resource);
                break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    } // Execute all calls, without worrying of errors (they will be thrown to consumer directly)


    return Promise.all(calls).then(callResults => {
      // Reduce results array into an object holding resources as keys
      return callResults.reduce((accumulator, value, index) => {
        const _index$split = [...calledResources][index].split('.'),
              _index$split2 = _slicedToArray(_index$split, 2),
              resource = _index$split2[0],
              subResource = _index$split2[1]; // Handle subresource case (for hardwares resource only)


        if (subResource) {
          // Create an empty object representing resource
          if (!accumulator[resource]) {
            accumulator[resource] = {};
          } // Treat value as an array


          if (!Array.isArray(value)) {
            value = [value];
          } // Create default empty array for subresource


          if (!accumulator[resource][subResource]) {
            accumulator[resource][subResource] = [];
          } // Add result to subresource results


          accumulator[resource][subResource] = accumulator[resource][subResource].concat(value);
        } else {
          // Always treat results as an array (if it is not hardwares resource)
          if (!accumulator[resource] && resource !== 'hardwares') {
            accumulator[resource] = [];
          }

          if (resource !== 'hardwares') {
            // Add result to resource results
            accumulator[resource] = accumulator[resource].concat(value);
          } else {
            // Just add result value in case of hardwares resource (e.g. asked for all hardwares)
            accumulator[resource] = value;
          }
        }

        return accumulator;
      }, {});
    });
  }

};