subspace - redux example 
===
Simple application that shows how to dispatch a redux action from an observable. This app will deploy a test contract to **Ganache**.
For using Subspace with `react` and `redux`, please check `examples/react-redux` to see a practical example

## Requirements
- `ganache-cli`
- `yarn` or `npm` installed.

## Install
In the parent folder, install, build and link the package with `yarn` or `npm`
```
yarn
yarn build:dev
yarn link
```
Then in the current folder link `@embarklabs/subspace`, and install the packages
```
yarn link "@embarklabs/subspace"
yarn
```

## Usage
In a terminal execute 
```
ganache-cli
```

In a different session, execute
```
node -r esm src/index.js 
```

You'll see in the console how the state changes everytime Subspace receives an event.


*Note*: this is a simple example application that does not include error handling for the web3 connection. Be sure `ganache-cli` is running in `localhost:8545` before executing the dapp.


### node-gyp problems
node-gyp can cause problems, because it requires a C++ compiler.

If you do have problems caused by it, first follow the installation steps for your OS [here](https://github.com/nodejs/node-gyp#installation).

If you still have problems and are on Windows, try the following:
- run `npm config set msvs_version 2015` before `npm install`
- Repair Windows Build tools that the node-gyp doc made you install. If it tells you to remove a conflicting version do it. After the repair succeeded, reboot.
