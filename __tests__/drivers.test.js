'use strict';

const eventPool = require('../eventPool');
const { pickupInTransit, deliveryHandler } = require('./driverHandler');
const Chance = require('chance');
const chance = new Chance();

jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Driver', () => {
  it('picks up and emits in transit as expected', () => {
    const payload = {
      store: '1-206-flowers',
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
    pickupInTransit(payload);
    expect(console.log).toHaveBeenCalledWith(`Driver: picked up order ${payload.orderId}`);
    expect(eventPool.emit).toHaveBeenCalledWith('IN_TRANSIT', payload);
  });

  it('delivers as expected', () => {
    const payload = {
      store: '1-206-flowers',
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
    deliveryHandler(payload);
    expect(console.log).toHaveBeenCalledWith(`DRIVER: delivered ${payload.orderId}`);
    expect(eventPool.emit).toHaveBeenCalled('DELIVERED', payload);
  });
});

