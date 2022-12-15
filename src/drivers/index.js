'use strict';

const { io } = require('socket.io-client');

const Chance = require('chance');
const chance = new Chance();

const MessageClient = require('../lib/messageClient');
const messenger = new MessageClient('messages');


messenger.subscribe('DELIVERED', (payload) => {
  console.log(`confirmed "${payload.text}" message received`);
});
  
setInterval(() => {
  let text = `Hi ${chance.first()}`;
  console.log('message sent: ', text);
  messenger.publish('MESSAGE', {messageId: chance.guid(), text});
  
}, 3000);