'use strict';

module.exports = (socket) => (payload) => {
  socket.on('PICKUP', payload);
  console.log('Driver: picked up order', payload.orderId);
  socket.emit('IN_TRANSIT', payload);

};

module.exports = (socket) => (payload) => {
  console.log('Driver: order delivered', payload.orderId);
  socket.emit('DELIVERED', payload);

};
