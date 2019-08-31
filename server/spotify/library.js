const {getFromSpotifyWithLimits} = require ('./spotifyRequest');
const {SAVED_TRACKS_URL, SAVED_ALBUMS_URL} = require ('../constants');


const getLikedSongs = function getLikedSongs (accessToken) {
  return getFromSpotifyWithLimits(SAVED_TRACKS_URL, accessToken);
}

const getLikedAlbums = function getLikedAlbums (accessToken) {
  return getFromSpotifyWithLimits(SAVED_ALBUMS_URL, accessToken);
}

module.exports = {
  getLikedSongs,
  getLikedAlbums
};