const {getFromSpotify} = require ('./spotifyRequest');

module.exports = {
  getPlaylists (accessToken, offset = 0) {
    return getFromSpotify('https://api.spotify.com/v1/me/playlists', accessToken, {
      params: {
        limit: 50,
        offset
      }
    }).then (async res => {
      if (res.items.length === res.limit) {
        res.data.items.push(...await module.exports.getPlaylists(accessToken, res.data.limit))
      }
      return res.items;
    })
  }
}
