'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const caps = server.of('/caps');

const PORT = process.env.PORT || 3001;

// instance of a listening event server at http://localhost:3001

const server = new Server(PORT);

caps.on('connection'), (socket) => {
  console.log('Socket connected to caps namespace', socket.id);

  socket.on('PICKUP', (payload) => {
    caps.emit(payload);
    console.log('Order ready for pickup', payload);
  });

  socket.on('IN_TRANSIT', (payload) => {
    caps.emit('IN_TRANSIT', payload);
    console.log('Order in transit', payload);
  });

  socket.on('DELIVERED', (payload) => {
    caps.emit('DELIVERED', payload);
    console.log('Order delivered', payload);
  });
};

function logger(event, payload){
  const time = new Date();
  console.log('EVENT:', {event, time, payload});
}