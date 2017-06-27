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
  return new Promise((resolve, reject) => {
    return Promise.delay(0).then(() => {

    })
  })
}

export function exhaustOrder2(order1, order2) {
  return new Promise((resolve, reject) => {
    return Promise.delay(0).then(() => {

    })
  })
}
