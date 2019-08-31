const {getFromSpotify, getFromSpotifyWithLimits} = require ('./spotifyRequest');
const _flatten = require('lodash/flatten')
const {TRACKS_TRACKS_URL, REQUEST_LIMIT} = require ('../constants');

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
      id: ids.join(',')
    }
  })
}

module.exports = {
  getTracks,
  requestTracks
}
