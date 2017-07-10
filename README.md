# MOB

### ERC20 <--> ERC20 Exchange

## Summary

This is a cloud based exhcange network for erc20 smart contracts. Given a set of n tokens the program creates a `n!/((n-2!)2!)` `permutations`, or a fully connected topology between the token set.

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

## Security Analysis

## Peer Servers

## Install
This program runs using `npm 5` & `node v8.1.2`

git clone https://github.com/mobprotocol/mob.git && cd mob-instance/

brew install node

npm i npm@latest
npm i ethereumjs-testrpc -g

## Run MOB
npm i

1. npm run user-swarm
2. npm run evm
3. npm run

## USER SWARM
`npm run user-swarm`

## EVM
`npm run evm`

## Assets
`npm run create-tokens`

## Exchange Network
`npm run create-tokens`

## Simulation
`npm run get-simulation-data`

## Licensing
`THIS IS OPEN SOURCE SOFTWARE` I encourage anyone to run, test, and even implement a clone in production for an intended market. If you are a startup planning to ICO, you can host your own markets.
