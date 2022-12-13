'use strict';


const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
const { generateOrder, thankDriver } = require('./vendorHandler'); 

socket.on('PICKUP', generateOrder);

socket.on('DELIVERED', thankDriver);

setInterval(() => {
  console.log('-------------new interval begins-------------');
  generateOrder(socket);
  thankDriver(socket);
  socket.emit('EVENT');
}, 5000);

