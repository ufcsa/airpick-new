'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PATH = require('path');

const PickreqSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  }
  ,
  airport: {
    type: String,
    trim: true,
    required: 'Airport cannot be blank'
  },
  ariivalTime: {
    type: Date,
    required: 'Arrival time cannot be blank'
  },
  carryOn: {
    type: Number,
    default: 0,
    required: 'Number of carry-ons cannto be blank'
  },
  baggage: {
    type: Number,
    default: 2,
    required: 'Number of baggages cannot be blank'
  },
  username: {
    type: String,
    index: true,
    required: 'username of requester cannot be blank'
  },
  volunteer: {
    type: String,
    default: ''
  },
  published: {
    type: Boolean,
    default: true
  },
  notes: {
    type: String,
    default: ''
  }
});

mongoose.model('Pickreq', PickreqSchema);