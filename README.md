# MOB

### ERC20 <--> ERC20 Exchange


# Summary

This is a cloud based exchange network for erc20 smart contracts. Given a set of n tokens the program creates `n!/((n-2!)2!)` `permutations`, or a fully connected topology between the token set.

Each permutation is composed of 4 basic elements that create a self maintaining order-book, matching, and settlement engine. The result is a parallelizable double-action network for the Ethereum ecosystem.

1. Orderbook
2. Matching
3. Cleaning
4. Settlement


## Orderbook

SellA and SellB ledger maintain a sorted set of orders. Two `double-ended-queue`s are instantiated for a two sided market place.

The protocol uses a price-priority queueing system, meaning the best price (least asks) are matched first. The orderbook ledgers are always perfectly sorted at any given point in time.


## Matching

The algorithm or `Agent` matches in continuous time with fast memory operations and async disk writes.

A daemon watches the top of the `Orderbook` and matches the best order in the Sell Ledger. The matching agent will choose with 50% probability `SellA or SellB` ledger. It takes the best order in the market and iterates through the opposite ledger until the order is exhausted, the order moves out of the market, or the ledger is emptied.

The matching Agent can only match orders `in the market`, meaning both parties are guaranteed at least as good of a deal as the ordered. Send amounts are calculated for the atomic swap between the two participants based on their price preference and the resulting spread left in the liquidity pool is sent to the Matching Agent. This means matching Agents are economically incentivized to maintain the price priority.


## Cleaning

A cleaning Agent, also implemented as a daemon, is continually watching the bottom of the Sell ledgers. The algorithm enforces an eventually true upper-bound on the ledger size. The size can be set by the operator and should be based on the capabilities of the server in production. By default the size is set to `10,000` orders.


## Settlement

The matching process accrues settlements which are appended to the Settlement queue. The Settlement ledger is implemented as a Last-in First-out stack.


# Install Mob
This program runs using `npm 5` & `node v8.1.2`

git clone https://github.com/mobprotocol/mob.git && cd mob-instance/

brew install node

npm i npm@latest
npm i ethereumjs-testrpc -g


# Run MOB

## USER SWARM

`npm run user-swarm`

This script creates 100 key pair identities that can sign and create transactions on our exchange network.


## EVM

`npm run evm`

This starts a `TESTRPC` process and unlocks the accounts of the user-swarm


## Assets
`npm run create-tokens`

Deploys 10 ERC20 token contracts. It magically creates a compiled json file and deploys the contracts to the EVM. Checkout out `/eths6` for the functional, promisified web3 library.


## Exchange Network
`npm run create-tokens`

Creates a fully connected topology between the token contracts. Each permutation has a memory process and disk partition in leveldb.


## Simulation
`npm run get-simulation-data`

Random markov-chain simulation algorithm with fluctuating market price and volume.


# Licensing
`THIS IS OPEN SOURCE SOFTWARE` I encourage anyone to run, test, and even implement a clone in production for an intended market. If you are a startup planning to ICO, you can host your own markets.
