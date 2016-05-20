'use strict';

import mongoose from 'mongoose';

var ChannelSchema = new mongoose.Schema({
  name: String,
  index: Number,
  beats:  [Boolean]
});

var RoomSchema = new mongoose.Schema({
  name: String,
  playing: {type: Boolean, default: false},
  tempo: {type: Number, default: 120},
  signature: {type: Number, default: 4},
  bar_resolution: {type: Number, default: 8},
  grid_length: {type: Number, default: 16},
  channels: [ChannelSchema]
});

export default mongoose.model('Room', RoomSchema);
