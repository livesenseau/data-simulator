const util = require('util');
const EventEmitter = require('events').EventEmitter;
/**
 * Handler
 *
 * @param {Object} Handler
 * @api public
 */
module.exports = Handler
util.inherits(Handler, EventEmitter)

function Handler(opts) {
  EventEmitter.call(this)
  this.opts = opts
}
