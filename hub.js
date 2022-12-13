'use strict';

const eventPool = require('./eventPool');
const Chance = require('chance');
const chance = new Chance();

// require handlers

const driverHandler = require('./src/drivers/driverHandler');
const vendorHandler = require('./src/vendors/vendorHandler');
const driverDelivered = require('./src/drivers/driverDelivery');
const vendorDelivered = require('./src/vendors/vendorDelivery');

eventPool.on('ORDER', vendorHandler);
eventPool.on('PICKUP', driverHandler);
eventPool.on('TRANSIT', driverDelivered);
eventPool.on('DELIVERED', vendorDelivered);

setInterval(() => {
  console.log('------------new order begins------------');
  const orderEvent = {
    event: 'ORDER',
    time: new Date(Date.now()),
    payload: {
      store: chance.company(),
      orderID: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    },
  };
  console.log(orderEvent);
  eventPool.emit('ORDER', orderEvent);
}, 3000);

