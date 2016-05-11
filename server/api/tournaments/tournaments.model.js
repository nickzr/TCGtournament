'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
paginator = require('mongoose-paginate');

var TournamentSchema = new mongoose.Schema({
  title: String,
  date: String,
  format: String,
  edition: String,
  rel: String,
  location: String,
  entryTime: String,
  startTime: String,
  price: String,
  info: String,
  players:[{
    firstName: String,
    lastName: String,
    DCI: String,
    email: String
  }]
});

TournamentSchema.plugin(paginator);

export default mongoose.model('Tournament', TournamentSchema);
