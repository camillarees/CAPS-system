'use strict';

let eventPool = require('../../eventPool');

module.exports = (payload) => {

  let deliveredEvent = {
    event: 'Delivered',
    time: new Date(),
    payload: payload,
  };
  console.log(`DRIVER: delivered ${deliveredEvent.payload.orderId}`);
  setTimeout(() => {
    eventPool.emit('DELIVERED', deliveredEvent);
  }, 3000);

};