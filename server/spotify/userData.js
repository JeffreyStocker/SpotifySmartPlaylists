const {getFromSpotify} = require ('./spotifyRequest');
const {getPlaylists} = require ('./playlists');

const getAllSongsDefaults = {
  includePlaylists: true,
  includeLikedSongs: true,
  includedLikedAlbums: true,
}

const getUserData = function getUserData (accessToken) {
  return getFromSpotify('https://api.spotify.com/v1/me', accessToken).then(res => {
    return res;
  }).catch (err =>  {
    console.error(err)
  })
}

const getAllSongsFromUser = async function getAllSongsFromUser (accessToken, options = getAllSongsDefaults) {
  options = Object.create (getAllSongsDefaults, options);
  const songs = new Set();
  const requests = [];

  requests[0] = options.includePlaylists ? getPlaylists(accessToken) : Promise.resolve([]);
  requests[1] = options.includeLikedSongs ? getPlaylists(accessToken) : Promise.resolve([]);
  requests[2] = options.includedLikedAlbums ? getPlaylists(accessToken) : Promise.resolve([]);

  const [retrievedPlaylists, retireivedLikedSongs, retrievedLikedAlbums] = await Promise.all(requrests);
}

module.exports = {
  getAllSongsFromUser,
  getUserData,
}