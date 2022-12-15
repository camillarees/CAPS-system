'use strict';

const { generateOrder, thankDriver } = require('./index');
const Chance = require('chance');
const chance = new Chance();
let socket = require('../socket-client');

jest.mock('../socket-client', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Vendor ', () => {
  it('emits order as expected', () => {
    const payload = {
      store: '1-206-flowers',
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
    generateOrder();

    expect(console.log).toHaveBeenCalledWith('new order for pickup', generateOrder.payload.orderId);
    expect(socket.broadcast.emit).toHaveBeenCalledWith('PICKUP', payload);
  });

  it('thanks the driver', () => {
    thankDriver();
    expect(console.log).toHaveBeenCalledWith('Vendor: Thank you for delivering to: ', thankDriver.payload.customer);
  });
}); 
