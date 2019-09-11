const axios = require ('axios');
const {generateBasicAuthorizationStr, generateAccessAuthorizationStr} = require ('./authorizeUtilties');

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
        "Authorization" : generateBasicAuthorizationStr(clientID, clientSECRET)
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
    qs.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirect_url
    }),
    {
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization" : generateBasicAuthorizationStr(clientID, clientSECRET)
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch (err => {
      console.error(err)
    })
}

const getRefreshToken = function getRefreshToken (refreshToken) {
  return axios.post('https://accounts.spotify.com/api/token',
    qs.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    {
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization" : generateBasicAuthorizationStr(clientID, clientSECRET)
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch (err => {
      console.error(err)
    })
}

module.exports = {
  getToken,
  generateAccessAuthorizationStr,
  getRefreshToken
};

/*
{
  "access_token": "NgCXRK...MzYjw",
  "token_type": "Bearer",
  "scope": "user-read-private user-read-email",
  "expires_in": 3600,
  "refresh_token": "NgAagA...Um_SHo"
}
*/

/*
200 	OK - The request has succeeded. The client can read the result of the request in the body and the headers of the response.
201 	Created - The request has been fulfilled and resulted in a new resource being created.
202 	Accepted - The request has been accepted for processing, but the processing has not been completed.
204 	No Content - The request has succeeded but returns no message body.
304 	Not Modified. See Conditional requests.
400 	Bad Request - The request could not be understood by the server due to malformed syntax. The message body will contain more information; see Response Schema.
401 	Unauthorized - The request requires user authentication or, if the request included authorization credentials, authorization has been refused for those credentials.
403 	Forbidden - The server understood the request, but is refusing to fulfill it.
404 	Not Found - The requested resource could not be found. This error can be due to a temporary or permanent condition.
429 	Too Many Requests - Rate limiting has been applied.
500 	Internal Server Error. You should never receive this error because our clever coders catch them all … but if you are unlucky enough to get one, please report it to us through a comment at the bottom of this page.
502 	Bad Gateway - The server was acting as a gateway or proxy and received an invalid response from the upstream server.
503 	Service Unavailable - The server is currently unable to handle the request due to a temporary condition which will be alleviated after some delay. You can choose to resend the request again.
*/