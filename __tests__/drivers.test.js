'use strict';

const eventPool = require('../eventPool');
const driverHandler = require('./src/drivers/driverHandler');
const driverDelivery = require('./src/drivers/driverDelivery');
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

describe('Driver Handler', () => {
  it('picks up order', () => {
    driverHandler(orderEvent);
    expect(console.log).toHaveBeenCalledWith(`DRIVER: picked up ${orderEvent.payload.orderID}`);
    expect(eventPool.emit).toHaveBeenCalled();
  });
});
describe('Driver Delivery', () => {
  it('delivers order', () => {
    driverDelivery(orderEvent);
    expect(console.log).toHaveBeenCalledWith(`DRIVER: delivered ${orderEvent.payload.orderID}`);
    expect(eventPool.emit).toHaveBeenCalled();
  });
});

