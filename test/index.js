/* global describe */
require('dotenv').config()

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const JM = require('../lib')
const v1Tests = require('./v1')(JM, chai.expect)

describe('just-mining', () => {
  describe('v1', v1Tests)
})
