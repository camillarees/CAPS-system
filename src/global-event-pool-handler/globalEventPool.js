'use strict';

const eventPool = require('../../eventPool');
const date = new Date();


function pickup(payload) {
  setTimeout(() => {
    let eventLog = {
      event: 'PICKUP',
      time: date.toGMTString(),
      payload: payload,
    };
    console.log('EVENT_LOG', eventLog);
  }, 500);
}

function inTransit(payload) {
  setTimeout(() => {
    let eventLog = {
      event: 'IN_TRANSIT',
      time: date.toGMTString(),
      payload: payload,
    };
    console.log('EVENT_LOG', eventLog);
  }, 500);
}

function delivered(payload) {
  setTimeout(() => {
    let eventLog = {
      event: 'DELIVERED',
      time: date.toGMTString(),
      payload: payload,
    };
    console.log('EVENT_LOG', eventLog);
  }, 500);
}


module.exports = { inTransit, pickup, delivered };