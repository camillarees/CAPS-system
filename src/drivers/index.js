'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
const driverHandler = require('./driverHandler');

socket.on('PICKUP', driverHandler);
socket.emit('IN_TRANSIT', driverHandler);