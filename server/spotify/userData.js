const axios = require ('axios');
const genAuthHeader = require('./authorize').generateAccessAuthorizationStr;
module.exports = {
  getUserData (accessToken) {
    return axios.get('https://api.spotify.com/v1/me', {
      headers:  {Authorization: genAuthHeader(accessToken)}
      // headers:  {Authorization: `Bearer ${accessToken}`}
    }).then(res => {
      return res.data;
    }).catch (err =>  {
      console.error(err)
    })
  }
}