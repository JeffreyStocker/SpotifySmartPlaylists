const {getFromSpotifyWithLimits} = require ('./spotifyRequest');
const {getPlaylistTracks} = require ('../constants');


const getTracksFromPlaylist = function (accessToken, playlistID) {
  return getFromSpotifyWithLimits(getPlaylistTracks(playlistID), accessToken);
}


module.exports = {
  getTracksFromPlaylist
}