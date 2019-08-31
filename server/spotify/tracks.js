const {getFromSpotify} = require ('./spotifyRequest');
const _flatten = require('lodash/flatten')
const {TRACKS_TRACKS_URL} = require ('../constants');

const REQUEST_LIMIT = 50;

const requestTracks =  function getTracks (accessToken, ids = []) {
  return getFromSpotify(TRACKS_TRACKS_URL, accessToken, {
    params: {
      ids: ids.join(',')
    }
  })
  .then (res => {
    return res.data;
  });
}

const getTracks = async function getTracks (accessToken, ids = []) {
  const tracks = [];
  if (ids.length < REQUEST_LIMIT + 1) {
    tracks.push(requestTracks(accessToken, ids));
  } else {
    for (let i = 0; i < ids.length; i += REQUEST_LIMIT) {
      const diff = ids.length - i;
      tracks.push(
        requestTracks(accessToken, ids.slice(i, diff < REQUEST_LIMIT ? ids.length - i : ids.length - 1))
      )
    }
  }
  const retrievedTracks = await Promise.all(tracks);
  return _flatten(retrievedTracks);
}

module.exports = {
  getTracks,
  requestTracks
}
