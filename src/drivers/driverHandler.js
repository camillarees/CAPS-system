'use strict';

const eventPool = require('../../eventPool');

module.exports = (payload) => {

  setTimeout(() => {
    console.log('DRIVER: picked up', payload.orderID);
  }, 500);
  let transitEvent = {
    event: 'TRANSIT',
    time: new Date(),
    payload: payload,
  };
  setTimeout(() => {
    eventPool.emit('TRANSIT', transitEvent);
  }, 3000);


};