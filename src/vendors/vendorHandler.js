'use strict';

const eventPool = require('../../eventPool');

function createParcel(payload){

  setTimeout(() => {
    const parcelPayload = {
      store: 'store name',
      orderID: 1234,
      customer: 'buddy',
      address: '222 Seattle',
    };

  }, 3000);
}

module.exports = { createParcel };