var SerialDevice = require('./serial-device.js');
var device = new SerialDevice({
  comName: '/dev/cu.usbmodem969601',
  serialOptions: {
    baudrate: 9600
  }
});