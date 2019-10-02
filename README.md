Subspace
===

## Overview
Subspace is a framework agnostic JS library that embraces reactive programming with RxJS, by observing asynchronous changes in Smart Contracts, and providing methods to track and subscribe to events, changes to the state of contracts and address balances, and react to these changes and events via callbacks.

### Documentation
https://status-im.github.io/subspace-docs/

### Install
Subspace can be used in browser, node and native script environments. You can install it through `npm` or `yarn`:
```
npm install --save @status-im/subspace
```

### Usage

#### Import into a dApp
```js
// ESM (might require babel / browserify)
import Subspace from '@status-im/subspace';

// CommonJS
const Subspace = require('@status-im/subspace');
```


### Initializing the library
To interact with the EVM, Subspace requires web3.js and a valid websockets provider.

```js
const subspace = new Subspace(web3.currentProvider);
await subspace.init();
```

In addition to the provider, `Subspace` also accepts an `options` object with settings that can change its behavior:
- `dbFilename` - Name of the database where the information will be stored (default 'subspace.db')
- `callInterval` - Interval of time in milliseconds to query a contract/address to determine changes in state or balance (default: obtain data every block).
- `refreshLastNBlocks` - Ignores last N blocks (from current block), stored in the local db and refresh them via a web3 subscription. Useful for possible reorgs (default: 12)

### API

#### `trackProperty(contractObject, functionName [, functionArgs] [, callOptions])`
Reacts to contract state changes by specifying the view function and arguments to call and query the contract. 
```js
const contractObject = ...; // A web3.eth.Contract object initialized with an address and ABI.
const functionName = "..."; // string containing the name of the contract's constant/view function to track.
const functionArgs = []; // array containing the arguments of the function to track. Optional
const callOptions = {from: web3.eth.defaultAccount}; //  Options used for calling. Only `from`, `gas` and `gasPrice` are accepted. Optional
subspace.trackProperty(contractObject, functionName, functionArgs, callOptions)
  .subscribe(value => console.dir)
```
This can be used as well to track public state variables, since they implicity create a view function when they're declared public. The `functionName` would be the same as the variable name, and `functionArgs` would have a value when the type is a `mapping` or `array` (since these require an index value to query them).



#### `trackEvent(contractObject, eventName [, options])`
Reacts to contract events and obtain its returned values.
```js
const contractObject = ...; // A web3.eth.Contract object initialized with an address and ABI.
const eventName = "..."; // string containing the name of the event to track.
const options = { filter: { }, fromBlock: 1 }; // options used to query the events. Optional

subspace.trackEvent(contractObject, eventName, options)
        .subscribe(eventData => console.dir);
```



#### `trackBalance(address [, tokenAddress])`
You can also track changes in both ETH and ERC20 token balances for each mined block or time interval depending on the callInterval configured. Balances are returned as a string containing the vaue in wei.

```js
// Tracking ETH balance
const address = "0x0001020304050607080900010203040506070809";

subspace
  .trackBalance(address)
  .subscribe((balance) => {
    console.log("ETH balance is ", balance)
  });
```

```js
// Tracking ERC20 balance
const address = "0x0001020304050607080900010203040506070809";
const tokenAddress = "0x744d70fdbe2ba4cf95131626614a1763df805b9e"; // SNT Address

subspace.trackBalance(address, tokenAddress)
        .subscribe((balance) => {
          console.log("Token balance is ", balance)
        });
```



#### Subscriptions
Subscriptions are triggered each time an observable emits a new value. These subscription receive a callback that must have a parameter which represents the value received from the observable;  and they return a subscription.

Subscriptions can be disposed by executing the method `unsubscribe()` liberating the resource held by it:

```js
const subscription = subspace.trackBalance(address, tokenAddress).subscribe(value => { /* Do something */ });

// ...

subscription.unsubscribe();
```

#### Cleanup
If Subspace is not needed anymore, you need can invoke close() to dispose and perform the cleanup necessary to remove the internal subscriptions and interval timers created by Subspace during its normal execution, thus avoiding any potential memory leak.

```
subspace.close();
```

## Contribution
Thank you for considering to help out with the source code! We welcome contributions from anyone on the internet, and are grateful for even the smallest of fixes!

If you'd like to contribute to Subspace, please fork, fix, commit and send a pull request for the maintainers to review and merge into the main code base. If you wish to submit more complex changes though, please check up with the core devs first on #embark-status channel to ensure those changes are in line with the general philosophy of the project and/or get some early feedback which can make both your efforts much lighter as well as our review and merge procedures quick and simple.

### To build:

* `yarn`
* `yarn build`

```js
const Subspace = require('./dist/node.js');
```

The browser version can be found at `dist/browser.js`. You can also check the examples in `test/`.

## License
MIT