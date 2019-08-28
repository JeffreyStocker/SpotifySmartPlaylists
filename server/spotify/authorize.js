const axios = require ('axios');
const clientID = process.env.CLIENT_ID;
const clientSECRET = process.env.CLIENT_SECRET;
const redirect_url = process.env.SPOTIFY_REDIRECT;
var qs = require('qs');

if (!clientID || !clientSECRET) {
  throw new Error ('Must include a CLIENT_ID and CLIENT_SECRET in .env file')
}

const clientCredentialsFlow = function clientCredentialsFlow (code) {
  console.log(clientID, clientSECRET)
  return axios.post('https://accounts.spotify.com/api/token',
    "grant_type=client_credentials" ,
    {
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization" : "Basic " + new Buffer(clientID+":"+clientSECRET).toString('base64')
    },
  })
    .then((res) => {
      console.log (res.data)
      return res.data;
    })
    .catch (err => {
      console.error(err)
      console.log (err.response.data)
    })
}

const getToken = function authorization_code (code) {
  return axios.post('https://accounts.spotify.com/api/token',
    // "grant_type=client_credentials" ,
    // "grant_type=authorization_code",
    qs.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirect_url
    }),
    {
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization" : "Basic " + new Buffer(clientID+":"+clientSECRET).toString('base64')
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch (err => {
      console.error(err)
    })
}

const refreshToken = function refreshToken () {

}

const generateAccessAuthorizationStr = function generateAccessAuthorizationStr (accessToken) {
  return `Bearer ${accessToken}`;
}

module.exports = {
  getToken,
  generateAccessAuthorizationStr
};