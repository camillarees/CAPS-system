'use strict';

const { pickupInTransit, deliveryHandler } = require('./driverHandler');
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
    expect(socket.broadcast.emit).toHaveBeenCalledWith('IN_TRANSIT', payload);
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
    expect(socket.broadcast.emit).toHaveBeenCalled('DELIVERED', payload);
  });
});

