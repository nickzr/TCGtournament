'use strict';

import mongoose from 'mongoose';

var MessageSchema = new mongoose.Schema({
  user: String,
  text: String,
  timestamp: Date
});

export default mongoose.model('Message', MessageSchema);
