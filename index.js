'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;

const server = new Server(PORT);
const caps = server.of('/caps');

const Queue = require('./server/lib/queue');
const messageQueue = new Queue();

caps.on('connection'), (socket) => {
  console.log('Socket connected to caps namespace', socket.id);


  socket.onAny((event, payload) => {
    let date = new Date;
    let time = date.toTimeString();
    console.log('EVENT', {event, time, payload});

  });
  
  socket.on('JOIN', (queueId) => {
    socket.join(queueId);
    socket.emit('JOIN', queueId);

  });

  socket.on('JOIN', (room) => {
    console.log('List of rooms', socket.rooms);
    console.log('payload-------', room);
    socket.join(room);
    console.log('You have joined', room);
    console.log('List of rooms', socket.rooms);
  });

  socket.on('PICKUP', (payload) => {
    socket.broadcast.emit(payload);
    console.log('Order ready for pickup', payload);
    let currentQueue = messageQueue.read(payload.queueId);
    if(!currentQueue){
      let queueKey = messageQueue.store(payload.queueId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);
    socket.broadcast.emit('PICKUP', payload);
  });
    
  socket.on('IN_TRANSIT', (payload) => {
    socket.broadcast.emit('IN_TRANSIT', payload);
    console.log('Order in transit', payload);
  });

  socket.on('DELIVERED', (payload) => {
    socket.broadcast.emit('DELIVERED', payload);
    console.log('Order delivered', payload);
  });

  socket.on('RECEIVED', (payload) => {
    let currentQueue = messageQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('No Queue Created, messaging error');
    }
    let deleteMessage = currentQueue.remove(payload.messageId);
  });

  socket.on('GETALL', (payload) => {
    console.log(`getting all messages for ${payload.queueId}` );

    let currentQueue = messageQueue.read(payload.queueId);
    if(currentQueue && currentQueue.data){
      Object.keys(currentQueue.data).forEach(messageId => {
        socket.emit('DELIVERED', currentQueue.read(messageId));
      });
    }
  });

};