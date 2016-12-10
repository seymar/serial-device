var SerialDevice = require('./serial-device.js');
var leds = new SerialDevice({
  comName: '/dev/cu.usbmodem969601',
  serialOptions: {
    baudrate: 921600
  }
});