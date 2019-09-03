const {getFromSpotify, getFromSpotifyWithLimits} = require ('./spotifyRequest');
const _flatten = require('lodash/flatten')
const {TRACKS_TRACKS_URL, REQUEST_LIMIT} = require ('../constants');
const {createOptions} = require ('../utilities/utilityFunction');

const requestTracks =  function getTracks (accessToken, ids = []) {
  return getFromSpotify(TRACKS_TRACKS_URL, accessToken, {
    params: {
      ids: ids.join(',')
    }
  })
}

const getTracks = async function getTracks (accessToken, ids = []) {
  return getFromSpotifyWithLimits(TRACKS_TRACKS_URL, accessToken, {
    params: {
      ids: ids.join(',')
    }
  })
}

const eachTrack = function eachTrack (tracks, callback, options = {}) {
  options = createOptions({ignoreLocal: true}, options);
  tracks.forEach((track, index, tracks) => {
    (options.ignoreLocal && track.track.is_local) || callback(track.track, index, tracks);
  })
}

/**
 * @param {Array} tracks list of tracks as returned from spotify api
 * @return {Promise<Set>} containing ids of all albums from tracks
 */
const getAllAlbumsIdsFromTracks = function (tracks = [], options = {}) {
  options = createOptions({ignoreLocal: true}, options);

  const albums = new Set();
  return new Promise ((resolve) => {
    eachTrack(tracks, (track) => {
      let albumID = track.album.id;
      albums.add(albumID);
    }, options)
    resolve(albums);
  })
}

const getArtistIdsFromTracks = function(tracks) {
  return new Promise((resolve, revoke) => {
    const artistsIds = []
    eachTrack(tracks, (track) => {
      if (track && track.artists) {
        track.artists.forEach(artist => {
          artist && artist.id && artistsIds.push(artist.id);
        })
      }
    })
    resolve (artistsIds);
  })
}

module.exports = {
  getTracks,
  requestTracks,
  eachTrack,
  getAllAlbumsIdsFromTracks,
  getArtistIdsFromTracks
}
