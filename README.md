# MOB

###ERC20 <--> ERC20 Exchange

##Summary
This is a cloud based exhcange network for erc20 smart contracts. Given a set of n tokens the program creates a `n!/((n-2!)2!)` `permutations`, or a fully connected topology between the token set.

Each permutation is composed of 4 basic elements that create a self maintaining order-book, matching, and settlement engine. The result is a parallelizable double-action network for the Ethereum ecosystem.

1. Orderbook: two `double-ended-queue`s are instantiated for a two sided market place. SellA and SellB ledger
2. Matching:
3. Cleaning:
4. Settlement:

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
