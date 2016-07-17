/**
 * Result model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _result = require('./result.model');

var _result2 = _interopRequireDefault(_result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ResultEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
ResultEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _result2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    ResultEvents.emit(event + ':' + doc._id, doc);
    ResultEvents.emit(event, doc);
  };
}

exports.default = ResultEvents;

//# sourceMappingURL=result.events-compiled.js.map