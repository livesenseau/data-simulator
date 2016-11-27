const Handler = require('./Handler');
const MqttGenerator = require('mqtt-generator');
const mqtt = require('mqtt');

/**
 * MqttHandler
 *
 * @param {Object} MqttHandler
 * @api public
 */
module.exports = MqttHandler

function MqttHandler(opts) {
    Handler.call(this)
    this.opts = opts;
    this.client = mqtt.connect(this.opts.broker.uri)

}

MqttHandler.prototype.onTick = function() {
    var msgGen = new MqttGenerator(this.opts);
    var msg = msgGen.generate();
    this.client.publish(this.opts.broker.topic, msg);
}

MqttHandler.prototype.onComplete = function() {}
