'use strict';

var net = require('net'),
  util = require('util'),
  _ = require('lodash'),
  Constants = require('./lib/Constants'),
  Scheduler = require('./lib/Scheduler'),
  Configurations = require('./lib/Configuration'),
  CsvHandler = require('./lib/CsvHandler'),
  ModbusHandler = require('./lib/ModbusHandler'),
  MqttHandler = require('./lib/MqttHandler'),
  EventEmitter = require('events').EventEmitter;

var _defaults = {
  debug: false
}

module.exports = Server
util.inherits(Server, EventEmitter)

/**
 * Server
 *
 * @param {Object} Server setup options
 * @api public
 */
function Server(options) {
  this._options = _.extend(_defaults, options)
  this._config = new Configurations(options);
  this._server = null;

  EventEmitter.call(this)
}

/**
 * Listen server
 *
 * @param {Number} Port where server listen to
 * @param {Function} Callback executed after listen
 * @api public
 */
Server.prototype.listen = function(port, callback) {
  if (this._options.debug) console.log('Server listening on port: ' + port)

  this._server = net.createServer(this._handleConnection.bind(this))

  this._server.on('error', this._handleServerError.bind(this))
  this._server.on('close', this._handleServerClose.bind(this))

  this._server.listen(port, callback)

  this._config.on('complete', this._handleConfiguration.bind(this))
  this._config.__init__();
}

Server.prototype._handleConfiguration = function(configs) {
  var scheds = _.filter(configs, (cfg) => {
    return cfg.application.type === "csv" || cfg.application.type === "mqtt"
  })

  var modbuses = _.filter(configs, (cfg) => {
    return cfg.application.type === "modbus"
  });

  this._scheduler = new Scheduler(scheds)
  this._scheduler.__init__()

  new ModbusHandler(modbuses);
}

/**
 * Handle connection
 *
 * @param {Object} Socket connection
 */
Server.prototype._handleConnection = function(socket) {
  if (this._options.debug) console.log('Handling connection from: ' + socket.remoteAddress + ' at ' + new Date())

  var connection = new Connection(socket)
  this.emit('connection', connection)
}

/**
 * Handle server 'error' event
 *
 * @param {Object} Error
 */
Server.prototype._handleServerError = function(error) {
  if (this._options.debug) console.log('_handleServerError')
  if (error) throw error
}

/**
 * Handle server 'close' event
 *
 */
Server.prototype._handleServerClose = function() {
  if (this._option.debug) console.log('_handleServerClose')
}

util.inherits(Connection, EventEmitter)

function Connection(socket, options) {
  this._options = _.extend(_defaults, options)
  EventEmitter.call(this)

  this._socket = socket
  this._socket.setEncoding('ascii')
  this._socket.setTimeout(Constants.SOCKET_IDLE_TIMEOUT)

  this._socket.on('error', this._handleConnectionError.bind(this))
  this._socket.on('end', this._handleConnectionEnd.bind(this))
  this._socket.on('timeout', this._handleConnectionTimeout.bind(this))
}

Connection.prototype._handleConnectionError = function(error) {
  if (this._options.debug) console.log('_handleConnectionError')
  this._socket.destroy()
}

Connection.prototype._handleAuthenticationHandshake = function() {
  if (this._options.debug) console.log('_handleAuthenticationHandshake')
  this.state = Constants.CONNECTION_STATE.AUTHENTICATED
}

Connection.prototype._handleConnectionEnd = function() {
  if (this._options.debug) console.log('_handleConnectionEnd')
  this._state = Constants.CONNECTION_STATE.DISCONNECT
  this._socket.end()

  // Avoid leaks ?
  this._socket = null
}

Connection.prototype._handleConnectionTimeout = function() {
  if (this._options.debug) console.log('_handleConnectionTimeout at ' + new Date())
  this._state = Constants.CONNECTION_STATE.TIMEOUT

  this._socket.end()
}

var Server = new Server({
  debug: true,
  configFolder: "./config"
})
Server.listen(Constants.SERVER_PORT_LISTEN)
