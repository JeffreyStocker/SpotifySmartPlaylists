const {getFromSpotify} = require ('./spotifyRequest');
const {ALBUMS_GET_ALBUMS_URL, getAlbumURL, getAlbumTracksURL, ALBUMS_GET_ALBUMS_MAX_REQUESTS} = require ('../constants');

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
      requestsIDs.push(getFromSpotify(ALBUMS_GET_ALBUMS_URL, accessToken, {
      params: {
        ids: currentIds.join(',')
      }
    }))
  }
  return Promise.all(requestsIDs)
    .then(albums => albums.reduce ((acc, {albums = []} = {}) => {
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
      if (album && album.id) {
        let albumID = album.id;
        ids.add(albumID);
      }
    })
    resolve(ids);
  })
}

const getArtistIdsFromAlbums = function (albums) {
  return new Promise((resolve) => {
    const artistIds = [];

    eachAlbum(albums, (album) => {
      if(album && album.artists) {
        album.artists.forEach(artist => artist && artist.id && artistIds.push(artist.id));
      }
    })
    resolve(artistIds);
  })
}

module.exports = {
  eachAlbum,
  getAlbum,
  getAlbums,
  getAlbumTracks,
  getAllIdsFromAlbums,
  getArtistIdsFromAlbums
}