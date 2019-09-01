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
  options = createOptions({ignoreLocal: false}, options);
  tracks.forEach((track, index, tracks) => {
    !ignoreLocal && !track.track.is_local && callback(track.track, index, tracks);
  })
}

/**
 * @param {Array} tracks list of tracks as returned from spotify api
 * @return {Promise<Set>} containing ids of all albums from tracks
 */
const getAllAlbumsIdsFromTracks = function (tracks = []) {
  return new Promise ((resolve) => {
    const albums = new Set();
    eachTrack(tracks, (track) => {
      let albumID = track.album.id;
      albums.add(albumID);
    })
    resolve(albums);
  })
}

module.exports = {
  getTracks,
  requestTracks,
  eachTrack,
  getAllAlbumsIdsFromTracks
}
