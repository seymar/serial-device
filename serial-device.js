(function(module) {
  var EventEmitter = require('events').EventEmitter;
  var SerialPort = require('serialport');
  var usb = require('usb');

  var SerialDevice = function(options) {
    EventEmitter.call(this);
    this.comName = options.comName;
    this.serialOptions = options.serialOptions;

    // Parsing
    this.delimiter = options.delimiter || '\n'; // Line end
    this.receivedData = '';

    this.SerialPort;
    this.openPort();

    usb.on('attach', function(device) {
      if(this.SerialPort.isOpen()) return false;
      this.openPort();
    }.bind(this));
  }
    SerialDevice.prototype = Object.create(EventEmitter.prototype);

    SerialDevice.prototype.openPort = function() {
      var _self = this;
      _self.SerialPort = new SerialPort(this.comName, this.serialOptions)
      .on('open', function() {
        _self.emit('open');
        console.log('Serial port ' + _self.comName + ' opened');
      })
      .on('data', function(data) {
        _self.emit('data', data);

        data = data.toString();

        // Line parsing
        for(var i = 0; i < data.length; i++) {
          if(data[i] == _self.delimiter) {
            _self.emit('line', _self.receivedData.trim());
            _self.receivedData = '';
          } else {
            _self.receivedData += data[i];
          }
        }
      })
      .on('error', function(err) {
        console.log('Serial port ' + _self.comName + ' error: ', err.message);
      })
      .on('close', function() {
        console.log('Serial port ' + _self.comName + ' closed');
      });
    }
    SerialDevice.prototype.send = function(data) {
      if(!this.SerialPort.isOpen()) return false;
      
      this.SerialPort.write(data, function(err) {
        if(err) return console.log('Error on write: ', err.message);
      });
    }
  module.exports = SerialDevice;
})(module);