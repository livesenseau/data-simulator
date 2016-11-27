const fs = require('fs');
const path = require('path');
const util = require('util');
const EventEmitter = require('events').EventEmitter;

/**
 * Configuration
 *
 * @param {Object} Configuration holder
 * @api public
 */
module.exports = Configurations
util.inherits(Configurations, EventEmitter)

function Configurations(config) {
  EventEmitter.call(this);
  this.config = config;
  if (config.debug)
    console.log("Reading configuration from " + config.configFolder)

  this.configs = []
}

Configurations.prototype.__init__ = function() {
  var files = fs.readdirSync(this.config.configFolder)
  files.forEach(this.parseFile.bind(this));

  this.emit('complete', this.configs);
}


Configurations.prototype.parseFile = function(file) {
  var pathtofile = path.join(this.config.configFolder, file)
  if (this.config.debug) console.log("Parsing file: " + pathtofile)
  this.configs.push(JSON.parse(fs.readFileSync(pathtofile)))
}
