'use strict';

import mongoose from 'mongoose';

var ResultSchema = new mongoose.Schema({
  name: String
});

export default mongoose.model('Result', ResultSchema);
