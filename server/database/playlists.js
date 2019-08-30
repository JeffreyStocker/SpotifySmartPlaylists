const mongoose = require ('mongoose');

const playlists = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  rules: {
    type: [{
      source: String,
      quantifier: String,
      target: String,
    }],
    default: []
  },
  limit: {
    type: Number,
    default: -1
  },
  autoUpdate: {
    type: Boolean,
    default: false
  },
  autoDelete: {
    type: Boolean,
    default: true
  },
  items: []
});

const Playlists = mongoose.model('Playlists', playlists);



module.exports = {
  model: Playlists,
  schema: playlists
}