import Promise from 'bluebird'

export function settleOrder(order1, order2) {
  if (order1.quantity < order2.quantity * order2.price) {
    return exhaustOrder1(order1, order2)
  } else if (order1.quantity > order2.quantity * order2.price) {
    return exhaustOrder2(order1, order2)
  } else {

  }
}

export function exhaustOrder1(order1, order2) {
  // return new Promise((resolve, reject) => {
  //   return Promise.delay(0).then(() => {
  //     const sell
  //   })
  // })
  const seller2amount = order1.price * order1.quantity
  const spread = calculateSpread(order1, order2)
}

export function exhaustOrder2(order1, order2) {
  // return new Promise((resolve, reject) => {
  //   return Promise.delay(0).then(() => {
  //
  //   })
  // })
  const seller1Amount = order2.price*order2.quantity
  const spread = calculateSpread(order2, order1)
}

export function calculateSpread(order1, order2) {
  return (order1.quantity/order2.price) - (order1.price * order1.quantity)
}
