'use strict';

let eventPool = require('../../eventPool');

module.exports = (payload) => {

  console.log(`Delivery ${payload.orderID} is complete`);
};