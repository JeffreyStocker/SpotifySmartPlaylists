const axios = require ('axios');
const genAuthHeader = require('./authorize').generateAccessAuthorizationStr;

const requestTracks =  function getTracks (accessToken, ids = []) {
  return axios.get('https://api.spotify.com/v1/tracks', {
    headers: {
      Authorization: genAuthHeader(accessToken)
    },
    params: {
      ids: ids.join(',')
    }
  }).then (res => {
    return res.tracks;
  });
}

module.exports = {
  async getTracks (accessToken, ids = []) {
    try {
      const tracks = [];
      if (ids.length < 51) {
        return requestTracks(accessToken, ids);
      }
      for (let i = 0; i < ids.length; i += 50) {
        const diff = ids.length - i;
        tracks.push(requestTracks(accessToken, ids.slice(i, diff < 50 ? ids.length - i : ids.length - 1)))
      }
      await Promise.all(tracks);
    } catch (err) {
      console.error(err)
    }

  }
}
