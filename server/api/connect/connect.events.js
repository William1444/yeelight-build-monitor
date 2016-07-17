/**
 * Connect model events
 */

'use strict';

import {EventEmitter} from 'events';
import Connect from './connect.model';
var ConnectEvents = new EventEmitter();

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
  Connect.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ConnectEvents.emit(event + ':' + doc._id, doc);
    ConnectEvents.emit(event, doc);
  }
}

export default ConnectEvents;
