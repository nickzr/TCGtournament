'use strict';

import mongoose from 'mongoose';

var MessageSchema = new mongoose.Schema({
  user: String,
  text: String,
  timestamp: Date,
  //automatically delete from database after expiretime
  createdAt: {
    type: Date,
    expireAfterSeconds: 90
  }
});

export default mongoose.model('Message', MessageSchema);
