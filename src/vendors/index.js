'use strict';

// BUILDOUT

const eventPool = require('../eventPool');
const { generateOrder, thankDriver } = require('./vendorHandler'); 

eventPool.on('DELIVERED', thankDriver);

setInterval(() => {
  console.log('-------------new interval begins-------------');
  generateOrder();
}, 5000);

