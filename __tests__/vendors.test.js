'use strict';

const eventPool = require('../eventPool');
const vendorHandler = require('./src/vendors/vendorHandler');
const vendorDelivery = require('./src/vendors/vendorDelivery');
const Chance = require('chance');
const chance = new Chance();

jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

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

describe('Vendor Handler', () => {
  it('creates new order for delivery', () => {
    vendorHandler(orderEvent);
    expect(console.log).toHaveBeenCalledWith('new order for pickup', orderEvent.payload.orderID);
  });
}); 

describe('Vendor Delivery', () => {
  test('confirms delivery completion', () => {
    vendorDelivery(orderEvent);
    expect(console.log).toHaveBeenCalledWith(`Delivery ${event.payload.orderID} complete`);
  });
}); 