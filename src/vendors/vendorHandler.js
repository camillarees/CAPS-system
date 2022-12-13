'use strict';

const Chance = require('chance');
const chance = new Chance();


function generateOrder(socket){
  let payload = {
    store: '1-206-flowers',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };

  console.log('Vendor: order ready for pickup');
  socket.emit('PICKUP', payload);

}

function thankDriver(payload){
  console.log('Vendor: Thank you for delivering to', payload.customer);
}

module.exports = { generateOrder, thankDriver };