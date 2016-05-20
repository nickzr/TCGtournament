'use strict';

import mongoose from 'mongoose';

var MessageSchema = new mongoose.Schema({
  user: String,
  text: String,
  timestamp: Date,
  createdAt: {
    type: Date,
    expireAfterSeconds: 90
  }
});

export default mongoose.model('Message', MessageSchema);
