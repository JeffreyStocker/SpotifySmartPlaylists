const mongoose = require ('mongoose');

// const sources = mongoose.Schema({
//   likedAlbums: {
//     default: true
//   },
//   likedSongs: true,
//   playLists: {
//     owned: true,
//     collaborative: false,
//     followed: false
//   }
// });

// const options = mongoose.Schema({
//   limit: {
//     type: Number,
//     default: -1
//   },
//   autoUpdate: {
//     type: Boolean,
//     default: false
//   },
//   autoDelete: {
//     type: Boolean,
//     default: true
//   },
//   sources: sources
// })

const playlists = mongoose.Schema({
  id: String,
  rules: {
    type: [{
      source: String,
      quantifier: String,
      target: String,
    }],
    default: []
  },
  options: {
    limit: {
      type: Number,
      max: 10000,
      min: 0,
      default: 10000
    },
    autoUpdate: {
      type: Boolean,
      default: false
    },
    autoDelete: {
      type: Boolean,
      default: true
    },
    sources: {
      likedAlbums: {
        default: true,
        type: Boolean
      },
      likedSongs: {
        default: true,
        type: Boolean
      },
      playLists: {
        owned: {
          default: true,
          type: Boolean
        },
        collaborative: {
          default: false,
          type: Boolean
        },
        followed: {
          default: false,
          type: Boolean
        }
      }
    }
  },
  items: []
});

const Playlists = mongoose.model('Playlists', playlists);

const getPlaylistByID = function getPlaylist (playlistID) {
  return Playlists.findOne({id: playlistId}).exec();
}

const updatePlaylist = function updatePlaylist (playlistId, updatedPlaylist) {
  return Playlists.findOneAndUpdate({id: playlistId}, updatedPlaylist).exec();
}


module.exports = {
  model: Playlists,
  schema: playlists,
  getPlaylistByID,
  updatePlaylist
}