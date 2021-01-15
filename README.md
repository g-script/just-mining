# just-mining

Node.js wrapper around [Just Mining][justmining]’s API.

[![Actions Status][actionshield]][actions]
[![npm][npmshield]][npmpackage]
[![JavaScript Style Guide][standardshield]][standard]
[![license][licenseshield]][license]

## :book: Table of contents

- [:floppy_disk: Installation][installation]
- [:beginner: Usage][usage]
- [:building_construction: Constructor][constructor]
- [:scroll: Methods][methods]
- [:beetle: Debugging][debugging]
- [:game_die: Running tests][running-tests]
- [:busts_in_silhouette: Contributing][contributing]
- [:1234: Versioning][versioning]

## :floppy_disk: Installation

```bash
npm install just-mining --save # or yarn add just-mining
```

**Node.js version 6 or higher is required.**

> Note: while Node.js from version 6 is supported, keep in mind that this library is only tested against Node.js 10+.

[Back to top][top]

## :beginner: Usage

```js
const JM = require('just-mining')

const client = new JM({ apiKey: 'YOUR_API_KEY' })

await JM.walletAddresses.list()
await JM.hardwares.get('bobs', 12345)
await JM.get('all')
await JM.get(['masternodes', 'operations'])
await JM.get({
  walletAddresses: 'all',
  clouds: [12345, 67890],
  hardwares: ['bobs', {
    type: 'asics',
    id: 12345
  }],
  stakings: 'KAVA'
})
```

[Back to top][top]

## :building_construction: Constructor

When instanciating the constructor, you have to provide parameters as an object with following properties :

- `apiKey` (required): API key provided by Just Mining.
  - You can get yours by going to [your account parameters][jmaccountparamapi], under the API tab.
- `version` (optional): target a specific version of Just Mining’s API.
  - As of today, the only available version is `v1`.

I do not know how Just Mining is planning to handle next versions. Will they disable older versions, keep all versions in parallel, keep older versions for some time before disabling them? I do not know. I will try to keep this library up-to-date with available versions.

[Back to top][top]

## :scroll: Methods

Just Mining’s API is organized around resources. Available resources are:

- Cloud contracts
- Hardwares
- Masternodes
- Operations
- Staking contracts
- Wallet addresses
- Wallets

Each resource is available as a property of the client object:

```js
client.masternodes
client.hardwares
...and so on
```

Each and every resource property has two exposed methods which are the following: `get` and `list`.

[Back to top][top]

### client.clouds.get(id)

Get an owned cloud contract.

**Arguments**

- `id` _(Number)_: cloud contract identifier

**Returns**

- _(Object)_: Returns an object describing the cloud contract

**Throws**

- if `id` is not provided
- if `id` is not a number
- if cloud contract was not found

**Example**

```js
await client.clouds.get(571)
// => {
//   id: 571,
//   status: 'inactive',
//   startDate: false,
//   expirationDate: 1535932800,
//   hashrate: 1000000,
//   currencyCode: 'ETC',
//   mined: {
//     ETH: 0.05191667,
//     ZEC: 0.00160224,
//     ETC: 0.09365148
//   }
// }
```

[Back to top][top]

### client.clouds.list()

Get all owned cloud contracts.

**Returns**

- _(Array)_: Returns an array of objects describing cloud contracts

**Throws**

- if cloud contracts were not found

**Example**

```js
await client.clouds.list()
// => [{
//   id: 571,
//   status: 'inactive',
//   startDate: false,
//   expirationDate: 1535932800,
//   hashrate: 1000000,
//   currencyCode: 'ETC',
//   mined: {
//     ETH: 0.05191667,
//     ZEC: 0.00160224,
//     ETC: 0.09365148
//   }
// }, {
//   id: 6904,
//   status: 'active',
//   startDate: false,
//   expirationDate: 1653682867,
//   hashrate: 100000000,
//   currencyCode: 'GRIN',
//   mined: {
//     GRIN: 0.19518281
//   }
// }]
```

[Back to top][top]

### client.hardwares.get(type, id)

Get an owned machine.

**Arguments**

- `type` _(String)_: machine type (**asics** or **bobs**)
- `id` _(Number)_: machine identifier

**Returns**

- _(Object)_: Returns an object describing the machine

**Throws**
- if `type` is not one of **asics** or **bobs**
- if `type` is not a string
- if `id` is not provided
- if `id` is not a number
- if hardware was not found

**Example**

```js
await client.hardwares.get('bobs', 580099)
// => {
//   serial: 580099,
//   status: 'inactive',
//   uptime: '285',
//   lastActivity: 1568986845,
//   hashrate: 175260000,
//   currencyCode: 'ETH',
//   mined: {
//     ETH: 0.00003053
//   }
// }
```

[Back to top][top]

### client.hardwares.list(type)

Get all machines. If `type` is provided, get all machines of this type.

**Returns**

If `type` is provided:
- _(Array)_: Returns an array of objects describing machines

If `type` is omitted:
- _(Object)_: Returns an object with properties matching machine types and containing an array of objects describing machines

**Throws**

- if machines were not found

**Example**

```js
await client.hardwares.list()
// => {
//   asics: [{
//     id: 330,
//     type: 'S17+',
//     status: 'active',
//     hashrate: 36270000000000,
//     currencyCode: 'BTC',
//     uptime: 71640,
//     mined: {
//       BTC: 0.02070824
//     }
//   }],
//   bobs: [{
//     serial: 580099,
//     status: 'inactive',
//     uptime: '285',
//     lastActivity: 1568986845,
//     hashrate: 175260000,
//     currencyCode: 'ETH',
//     mined: {
//       ETH: 5.00003053
//     }
//   }]
// }

await client.hardwares.list('bobs')
// => [{
//   serial: 580099,
//   status: 'inactive',
//   uptime: '285',
//   lastActivity: 1568986845,
//   hashrate: 175260000,
//   currencyCode: 'ETH',
//   mined: {
//     ETH: 5.00003053
//   }
// }]
```

[Back to top][top]

### client.masternodes.get(id)

Get an owned masternode.

**Arguments**

- `id` _(Number)_: masternode identifier

**Returns**

- _(Object)_: Returns an object describing the masternode

**Throws**

- if `id` is not provided
- if `id` is not a number
- if masternode was not found

**Example**

```js
await client.masternodes.get(9208)
// => {
//   id: 9208,
//   status: 'active',
//   collateral: 250,
//   currencyCode: 'BITG',
//   reward: 0.00149775,
//   startDate: 1590739635,
//   endDate: null
// }
```

[Back to top][top]

### client.masternodes.list()

Get all owned masternodes.

**Returns**

- _(Array)_: Returns an array of objects describing masternodes

**Throws**

- if masternodes were not found

**Example**

```js
await client.masternodes.list()
// => [{
//   id: 9208,
//   status: 'active',
//   collateral: 250,
//   currencyCode: 'BITG',
//   reward: 0.00149775,
//   startDate: 1590739635,
//   endDate: null
// }, {
//   id: 9224,
//   status: 'active',
//   collateral: 4.2,
//   currencyCode: 'ZEN-42',
//   reward: 0.00001253,
//   startDate: 1590739640,
//   endDate: null
// }]
```

[Back to top][top]

### client.operations.get(id)

Get an operation (withdrawal, exchange, debit or credit).

**Arguments**

- `id` _(Number)_: operation identifier

**Returns**

- _(Object)_: Returns an object describing the operation

**Throws**

- if `id` is not provided
- if `id` is not a number
- if operation was not found

**Example**

```js
await client.operations.get(5412)
// => {
//   id: 5412,
//   type: 'withdraw',
//   status: 'paid',
//   date: 1544977587,
//   sourceCurrencyCode: 'ETC',
//   sourceAmount: 1,
//   destinationCurrencyCode: 'ETC',
//   destinationAmount: 0,
//   destinationAddress: '0x........................',
//   memo: null
// }
```

[Back to top][top]

### client.operations.list()

Get all account operations.

**Returns**

- _(Array)_: Returns an array of objects describing operations

**Throws**

- if operations were not found

**Example**

```js
await client.operations.list()
// => [{
//   id: 3010,
//   type: 'withdraw',
//   status: 'paid',
//   date: 1538914035,
//   sourceCurrencyCode: 'ETH',
//   sourceAmount: 3.7,
//   destinationCurrencyCode: 'ETH',
//   destinationAmount: 0,
//   destinationAddress: '0x..................',
//   memo: null
// }, {
//   id: 4027,
//   type: 'withdraw',
//   status: 'paid',
//   date: 1537115656,
//   sourceCurrencyCode: 'ETH',
//   sourceAmount: 0.517,
//   destinationCurrencyCode: 'ETH',
//   destinationAmount: 0,
//   destinationAddress: '0x....................',
//   memo: null
// }, {
//   id: 5181,
//   type: 'exchange',
//   status: 'paid',
//   date: 1536862720,
//   sourceCurrencyCode: 'ZEC',
//   sourceAmount: 0.00370617,
//   destinationCurrencyCode: 'ETH',
//   destinationAmount: 0.00233272
// }, {
//   id: 4522,
//   type: 'credit',
//   status: 'paid',
//   date: 1532299229,
//   currencyCode: 'BCARD',
//   amount: 5,
//   details: 'Masternode sale'
// }]
```

[Back to top][top]

### client.stakings.get(currencyCode)

Get an owned staking contract.

**Arguments**

- `currencyCode` _(String)_: staking contract currency code

**Returns**

- _(Object)_: Returns an object describing the staking contract

**Throws**

- if `currencyCode` is not provided
- if `currencyCode` is not a string
- if staking contract was not found

**Example**

```js
await client.stakings.get('KAVA')
// => {
//   currencyCode: 'KAVA',
//   amount: 75,
//   reward: 0.01027898,
//   lockedReward: 0,
//   startDate: 1590582716,
//   variations: [
//     {
//       amount: 75,
//       date: 1590582716,
//       effectiveDate: 1590669116,
//       applied: 1
//     }
//   ],
//   credits: [
//     {
//       amount: 0.00432936,
//       date: 1590710400,
//       releaseDate: false,
//       released: 1
//     },
//     {
//       amount: 0.00594962,
//       date: 1590624000,
//       releaseDate: false,
//       released: 1
//     }
//   ]
// }
```

[Back to top][top]

### client.stakings.list()

Get all owned staking contracts.

**Returns**

- _(Array)_: Returns an array of objects describing staking contracts

**Throws**

- if staking contracts were not found

**Example**

```js
await client.stakings.list()
// => [{
//   currencyCode: 'KAVA',
//   amount: 75,
//   reward: 0.01027898,
//   lockedReward: 0,
//   startDate: 1590582716,
//   variations: [
//     {
//       amount: 75,
//       date: 1590582716,
//       effectiveDate: 1590669116,
//       applied: 1
//     }
//   ],
//   credits: [
//     {
//       amount: 0.00432936,
//       date: 1590710400,
//       releaseDate: false,
//       released: 1
//     },
//     {
//       amount: 0.00594962,
//       date: 1590624000,
//       releaseDate: false,
//       released: 1
//     }
//   ]
// }, {
//   currencyCode: 'SNX',
//   amount: 500,
//   reward: 0,
//   lockedReward: 0,
//   startDate: 1590594695,
//   variations: [
//     {
//       amount: 500,
//       date: 1590594695,
//       effectiveDate: 1590681095,
//       applied: 1
//     }
//   ],
//   credits: []
// }]
```

[Back to top][top]

### client.walletAddresses.get(currencyCode, id)

Get an owned address.

**Arguments**

- `currencyCode` _(String)_: address currency code
- `id` _(Number)_: address identifier

**Returns**

- _(Object)_: Returns an object describing the address

**Throws**
- if `currencyCode` is not provided
- if `currencyCode` is not a string
- if `id` is not provided
- if `id` is not a number
- if address was not found

**Example**

```js
await client.walletAddresses.get('BNB', 11402)
// => {
//   id: 11402,
//   currencyCode: 'BNB',
//   name: null,
//   address: 'bnb.....................',
//   isBEP2: true,
//   memo: 'memo',
// }
```

[Back to top][top]

### client.walletAddresses.list(currencyCode)

Get all addresses. If `currencyCode` is provided, returns all addresses for this currency code.

**Returns**

- _(Array)_: Returns an array of objects describing addresses

**Throws**

- if addresses were not found

**Example**

```js
await client.walletAddresses.list()
// => [{
//   id: 11401,
//   currencyCode: 'ETH',
//   name: null,
//   address: '0x............................',
//   isBEP2: false,
//   memo: null,
// }, {
//   id: 11402,
//   currencyCode: 'BNB',
//   name: null,
//   address: 'bnb.....................',
//   isBEP2: true,
//   memo: 'memo',
// }]

await client.walletAddresses.list('ETH')
// => [{
//   id: 11401,
//   currencyCode: 'ETH',
//   name: null,
//   address: '0x............................',
//   isBEP2: false,
//   memo: null,
// }]
```

[Back to top][top]

### client.wallets.get(currencyCode)

Get an owned wallet.

**Arguments**

- `currencyCode` _(String)_: wallet currency code

**Returns**

- _(Object)_: Returns an object describing the wallet

**Throws**

- if `currencyCode` is not provided
- if `currencyCode` is not a string
- if wallet was not found

**Example**

```js
await client.wallets.get('ETH')
// => {
//   currencyCode: 'ETH',
//   balance: 0.03190596
// }
```

[Back to top][top]

### client.wallets.list()

Get all owned wallets.

**Returns**

- _(Array)_: Returns an array of objects describing wallets

**Throws**

- if wallets were not found

**Example**

```js
await client.wallets.list()
// => [{
//   currencyCode: 'ZEC',
//   balance: 0.00160223
// }, {
//   currencyCode: 'ETH',
//   balance: 0.03190596
// }, {
//   currencyCode: 'ETC',
//   balance: 0.09259209
// }]
```

[Back to top][top]

## :beetle: Debugging

This library uses [`debug` package][debugpkg] internally. You can enable debug logs by setting the `DEBUG` environment variable to `just-mining:*`.

You can target a specific resource debug logs by being more specific: `DEBUG=just-mining:v1:walletAddresses`.

[Back to top][top]

## :game_die: Running tests

This package is tested against multiple different scenarios with [Mocha][mocha] and [chai][chai] (through `expect` BDD style). It also rely on [nock][nock] to mock API responses.

In order to run tests locally, you have to:
- clone this repository
- install development dependencies with `npm install` (or `yarn install`)
- run tests with `npm test` (or `yarn test`)

> _Tests are run in bail mode. This means that whenever a test fails, all following tests are aborted._

[Back to top][top]

## :busts_in_silhouette: Contributing

See [CONTRIBUTING.md][contribute].

[Back to top][top]

## :1234: Versioning

This project uses [SemVer][semver] for versioning. For the versions available, see the [tags on this repository][repotags].

[Back to top][top]

[justmining]: https://www.just-mining.com
[actionshield]: https://github.com/g-script/just-mining/workflows/Lint%20and%20test%20JS%20files/badge.svg
[actions]: https://github.com/g-script/just-mining/actions
[npmshield]: https://img.shields.io/npm/v/just-mining.svg
[npmpackage]: https://www.npmjs.com/package/just-mining
[standardshield]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard]: https://standardjs.com
[licenseshield]: https://img.shields.io/github/license/mashape/apistatus.svg
[license]: https://github.com/g-script/just-mining/blob/main/LICENSE
[top]: #book-table-of-contents
[installation]: #floppy_disk-installation
[usage]: #beginner-usage
[constructor]: #building_construction-constructor
[jmaccountparamapi]: https://www.just-mining.com/dashboard/account/api
[methods]: #scroll-methods
[debugging]: #beetle-debugging
[debugpkg]: https://npmjs.com/package/debug
[running-tests]: #game_die-running-tests
[mocha]: https://mochajs.org
[chai]: https://www.chaijs.com/api/bdd/
[nock]: https://github.com/nock/nock
[contributing]: #busts_in_silhouette-contributing
[contribute]: https://github.com/g-script/just-mining/blob/main/CONTRIBUTING.md
[versioning]: #1234-versioning
[semver]: http://semver.org
[repotags]: https://github.com/g-script/just-mining/tags
