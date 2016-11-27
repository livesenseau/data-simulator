/*jslint node: true */
/*jshint asi: true */
'use strict';

/**
@module Constants
**/
function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

/**
Default port on that server will listen for connections

@property SERVER_PORT_LISTEN
@type Number
@default 8500
@static
*/
define('SERVER_PORT_LISTEN', 8500)

/**
Protocol Timeout, when no messages are sent by any of the parties
for longer than `SOCKET_IDLE_TIMEOUT`

@property OPERATION_MODES
@type Number
@default 30 seconds
@static
*/
define('SOCKET_IDLE_TIMEOUT', 30 * 1000)

define('CRLF', '\n')

define('SYNC_MARK', ':')

/**
`NORMAL` appliance is in normal operation mode. When an available product is
 inserted, the oldest product of that type in the storage wheel is dispensed. Value is 0.

`LOAD` appliance will be loaded with new products. All new products are added to the product table.
 Value is 3.

@property OPERATION_MODES
@type Object
@final
@static
*/
define('OPERATION_MODES', { NORMAL: 0, LOAD: 3})


define('CONNECTION_STATE', { DISCONNECT: 0, CONNECTED: 1, AUTHENTICATED: 2})