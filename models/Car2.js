const mongoose = require('../connect/mongo')

const Schema = mongoose.Schema;

const schema = new Schema({
  cloud_id: {
    type: String,
    required: true
  },
  system: {
    type: String,
    default: null
  },
  systemName: {
    type: String,
    default: null
  },
  dealer: {
    type: String,
    default: null
  },
  systemInfo: {
    type: Schema.Types.Mixed,
    default: {
      owner: null,
      mark: null,
      lastLocation: null,
      takeTime: null
    }
  },
  obd: {
    type: String,
    default: null
  },
  archived: {
    type: Boolean,
    default: false
  },
  archivedAt: {
    type: Date
  }
}, {
  strict: false,
  // timestamps: true
});

const Car2 = mongoose.model('Car2', schema);

module.exports = Car2;