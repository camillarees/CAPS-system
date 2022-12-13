'use strict';

const eventPool = require('./eventPool');
const Chance = require('chance');
const chance = new Chance();
require('./src/drivers');
require('./src/vendors');

function logger(event, payload){
  const time = new Date();
  console.log('EVENT:', {event, time, payload});
}

eventPool.on('PICKUP:', (payload) => logger('PICKUP', payload));
eventPool.on('IN_TRANSIT:', (payload) => logger('IN_TRANSIT', payload));
eventPool.on('DELIVERED:', (payload) => logger('DELIVERED', payload));


setInterval(() => {
  console.log('------------new order begins------------');
  const orderEvent = {
    event: 'ORDER',
    time: new Date(Date.now()),
    payload: {
      store: chance.company(),
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    },
  };
  console.log(orderEvent);
  eventPool.emit('ORDER', orderEvent);
}, 3000);

