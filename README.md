# serial-device

A node module build on top of [serialport](http://npmjs.org/package/serialport) adding some handy features like:
 * Auto re-open when a device is plugged in
 * Event firing when a new line is received

## Example
```javascript
var hub = new SerialDevice({
  comName: '/dev/cu.usbmodem12341',
  serialOptions: { // Options passed to serialport module
    baudrate: 115200
  },
  lineEnding: '\r\n' // Default: \n
});
hub.on('line', function(line) {
	console.log(line);
}
hub.send(new Buffer('data\n'));
```