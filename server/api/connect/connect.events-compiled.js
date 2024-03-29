/**
 * Connect model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _connect = require('./connect.model');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConnectEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
ConnectEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _connect2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    ConnectEvents.emit(event + ':' + doc._id, doc);
    ConnectEvents.emit(event, doc);
  };
}

exports.default = ConnectEvents;

//# sourceMappingURL=connect.events-compiled.js.map