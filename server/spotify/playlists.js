const axios = require ('axios');
const genAuthHeader = require('./authorize').generateAccessAuthorizationStr;

module.exports = {
  getPlaylists (accessToken, offset = 0) {
    return axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: genAuthHeader(accessToken)
      },
      params: {
        limit: 50,
        offset
      }
    }).then (async res => {
      if (res.data.items.length === res.data.limit) {
        res.data.items.push(...await module.exports.getPlaylists(accessToken, res.data.limit))
      }
      return res.data.items;
    })
  }
}
