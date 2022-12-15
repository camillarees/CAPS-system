'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
const Chance = require('chance');
const chance = new Chance();
const Client = require('../lib/queue');
const flowerVendor = new Client('Acme Widgets');

flowerVendor.subscribe('DELIVERED', (payload) => {
  console.log(`Thank you for delivering ${payload.orderId}`);
  flowerVendor.publish('Vendor: Message Recieved', payload);
});

setInterval(() => {
  console.log('Acme Widgets: Widgets ready for pickup');
  let payload = {
    messageId: chance.guid(),
    store: 'Acme Widgets',
    orderId: chance.string(),
    customer: chance.name(),
    address: chance.address(),
  };
  socket.emit('PICKUP', payload);
}, 2000);
