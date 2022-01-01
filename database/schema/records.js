const { Schema } = require('mongoose');

const Record = new Schema({
  nickname: {
    type: String,
    required: true
  },
  numberOfCard: {
    type: Number,
    required: true
  },
  cardType: {
    type: String,
    required: true
  },
  steps: {
    type: Number,
    required: false
  },
  time: {
    type: Number,
    required: false
  },
  date: {
    type: Date,
    required: false
  }
});

module.exports = Record;
