const Handler = require('./Handler');
const fs = require('fs');
const path = require('path');
const util = require('util');
const CsvGenerator = require("csv-generator");
/**
 * CsvHandler
 *
 * @param {Object} CsvHandler
 * @api public
 */
module.exports = CsvHandler

function CsvHandler(opts) {
  Handler.call(this)

  this.opts = opts;
}

CsvHandler.prototype.onTick = function() {
  var csvGen = new CsvGenerator(this.opts);
  var wstream = fs.createWriteStream(csvGen.fileName(new Date()));
  csvGen.pipe(wstream)
}

CsvHandler.prototype.onComplete = function() {}
