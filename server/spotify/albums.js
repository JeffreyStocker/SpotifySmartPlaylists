const {getFromSpotify, getFromSpotifyWithLimits} = require ('./spotifyRequest');
const {getAlbumURL, getAlbumsURL, getAlbumTracksURL, ALBUMS_GET_ALBUMS_MAX_REQUESTS} = require ('../constants');
const _flatten = require ('lodash/flatten')

/**
 *
 * @param {Array} albums
 * @callback Function callback with album, index, then collection of albums
 */
const eachAlbum = function (albums, callback) {
  albums.forEach ((album, index, albums) => {
    callback(album.album, index, albums);
  })
}

const getAlbum = function getAlbum (accessToken, id) {
  return getFromSpotify(getAlbumURL(id), accessToken)
}

const getAlbums = function getAlbums (accessToken, ids) {
  requestsIDs = [];
  for (let i = 0; i < ids.length; i += ALBUMS_GET_ALBUMS_MAX_REQUESTS) {
    const currentIds = ids.slice(i, i + ALBUMS_GET_ALBUMS_MAX_REQUESTS)
    requestsIDs.push(getFromSpotifyWithLimits(getAlbumsURL(), accessToken, {
      params: {
        ids: currentIds.join(',')
      }
    }))
  }
  return Promise.all(requestsIDs)
    .then(albums => albums.reduce ((acc, {albums}) => {
      acc.push(...albums);
      return acc;
    }, [])
  )
}

const getAlbumTracks = function getAlbumTracks (accessToken, id) {
  return getFromSpotify(getAlbumTracksURL(id), accessToken)
}

/**
 * @param {Array} tracks list of albums as returned from spotify api
 * @return {Promise<Set>} containing ids of all albums
 */
const getAllIdsFromAlbums = function (albums = []) {
  return new Promise ((resolve) => {
    const ids = new Set();
    eachAlbum(albums, (album) => {
      let albumID = album.album.id;
      ids.add(albumID);
    })
    resolve(ids);
  })
}

module.exports = {
  eachAlbum,
  getAlbum,
  getAlbums,
  getAlbumTracks,
  getAllIdsFromAlbums
}