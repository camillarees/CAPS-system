'use strict';

const eventPool = require('../../eventPool');

module.exports = (payload) => {

  setTimeout(() => {
    console.log('DRIVER: picked up', payload.orderID);
  }, 500);
  setTimeout(() => {
    eventPool.emit('TRANSIT', payload);
  }, 500);
  setTimeout(() => {
    eventPool.emit('DRIVER: delivered', payload.orderID);
  }, 3000);


};