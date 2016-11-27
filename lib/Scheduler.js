var fs = require('fs'),
    CsvHandler = require('./CsvHandler'),
    MqttHandler = require('./MqttHandler'),
    CronJob = require('cron').CronJob;


/**
 * Scheduler
 *
 * @param {Object} Scheduler configuration
 * @api public
 */
module.exports = Scheduler

function Scheduler(config) {
  this.jobs = [];
  this.config = config;
}

Scheduler.prototype.__init__ = function() {
  var self = this;

  this.config.forEach(function(config) {
      if (config.application.type === "csv") handler = new CsvHandler(config);
      if (config.application.type === "mqtt") handler = new MqttHandler(config);

      var job = new CronJob(config.schedule.cron, handler.onTick, handler.onComplete, true, null, handler, false);
      self.jobs.push(job);
  });
}
