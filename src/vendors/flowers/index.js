'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
const Chance = require('chance');
const chance = new Chance();
const Client = require('../lib/queue');
const flowerVendor = new Client('1-206-flowers');

flowerVendor.subscribe('DELIVERED', (payload) => {
  console.log(`Thank you for delivering ${payload.orderId}`);
  flowerVendor.publish('Vendor: Message Recieved', payload);
});

setInterval(() => {
  console.log('1-206-flowers: Flowers ready for pickup');
  let payload = {
    messageId: chance.guid(),
    store: '1-203-flowers',
    orderId: chance.string(),
    customer: chance.name(),
    address: chance.address(),
  };
  socket.emit('PICKUP', payload);
}, 2000);
