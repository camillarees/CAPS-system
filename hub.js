'use strict';

const eventPool = require('./eventPool');

// require handlers

const globalEvent = require('./src/global-event-pool-handler/globalEventPool');
const driverHandler = require('./src/drivers/driverHandler');
const vendorHandler = require('./src/vendors/vendorHandler');

eventPool.on('PARCEL', globalEvent);
eventPool.on('TRANSIT', globalEvent);
eventPool.on('DELIVERED', driverHandler);
eventPool.on('PICKUP', vendorHandler);

