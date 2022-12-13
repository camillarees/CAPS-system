'use strict';

const eventPool = require('../../eventPool');

module.exports = (payload) => {
  setTimeout(() => {
    console.log('new order for pickup', payload.orderID);
  }, 3000);
  const pickupEvent = {
    event: 'picked up',
    time: new Date(),
    payload: payload,
  };
  setTimeout(() => {
    eventPool.emit('PICKUP', pickupEvent);
  }, 3000);

};
