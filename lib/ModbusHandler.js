const Handler = require('./Handler');
const fs = require('fs');
const path = require('path');
const util = require('util');
const modbus = require("modbus-tcp");
/**
 * ModbusHandler
 *
 * @param {Object} ModbusHandler
 * @api public
 */
module.exports = ModbusHandler

function ModbusHandler() {
  var handlers = {};

  // Define a handler for "Read Input Registers". We'll just respond with the register
  // number requested. In a real-world situation, you'd probably look up these values from
  // a database, etc.

  // handlers[FC.READ_INPUT_REGISTERS] = function(request, response) {
  //   console.log('Handling request' + request);
  //   var start = request.startAddress;
  //   var length = request.quantity;

  //   var resp = new Array(length);
  //   for (var i = 0; i < length; i++) {
  //     resp[i] = start + i;
  //   }
  //   response.writeResponse(resp);
  // }

  // function handlers() {
  //   console.log('Handling request' + request);
  //   var start = request.startAddress;
  //   var length = request.quantity;

  //   var resp = new Array(length);
  //   for (var i = 0; i < length; i++) {
  //     resp[i] = start + i;
  //   }
  //   response.writeResponse(resp);
  // }

  // require('modbus-stack/server').createServer(handlers).listen(6505);

  var server = new modbus.Server();
  server.on("read-coils", function(from, to, reply) {
    return reply(null, [1, 0, 1, 1]);
  });
}
