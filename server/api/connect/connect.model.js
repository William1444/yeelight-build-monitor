'use strict';

import mongoose from 'mongoose';

var ConnectSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Connect', ConnectSchema);
