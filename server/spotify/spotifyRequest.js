const axios = require ('axios');
const genAuthHeader = require('./authorize').generateAccessAuthorizationStr;
const {getAndUpdateRefreshToken} = require ('../database/users');
const {REQUEST_LIMIT} = require ('../constants');

const generateRequestOptions = function generateRequestOptions (accessToken, options = {}) {
  return {
    ...options,
    headers: {
      Authorization: genAuthHeader(accessToken),
      ...options.headers ? options.headers : {}
    }
  }
}

const generateRequestLimitOptions = function generateRequestLimitOptions (accessToken, options = {}) {
  return {
    ...generateRequestOptions(accessToken, options),
    params: {
      limit: REQUEST_LIMIT,
      ...options.params ? options.params : {}
    }
  }
}

const request = function (url, options = {}) {
  return new Promise ((resolve, revoke) => {
    axios.get(url, options)
      .then(resolve)
      .catch(revoke)
  })
}

const getFromSpotify = function getFromSpotify (url, accessToken, options = {}) {
  let firstRun = true;
  const requestOptions = generateRequestOptions(accessToken, options);
  return request(url, requestOptions)
    .then(res => {
      if (res.isAxiosError) {
        switch (res.response.status) {
          case 401:
            firstRun = false;
            return getAndUpdateRefreshToken(accessToken)
              .then(newToken => {
                const newRequestOptions = generateRequestOptions(newToken, options);
                return request(url, newRequestOptions)
              })
            break;
          case 429:
            //wip
            const timeout = err.Retry-After
            return new Promise ((resolve, revoke) => {
              setTimeout(() => {
                getFromSpotify (url, accessToken, options)
                  .then(resolve)
                  .catch(revoke)
              }, timeout)
            })
            break;
          default:
            break;
        }
      } else {
        return res
      }
    })
    .then (res => {
      if (res.isAxiosError) {
        throw new Error (res);
      }
      return res.data;
    })
}

const getFromSpotifyWithLimits = async function getFromSpotifyWithLimits(url, accessToken, options = {}) {
  const items = [];
  let next = url;

  do {
    let request = await getFromSpotify(next, accessToken, generateRequestLimitOptions(accessToken, options))
      .then(data => data);
    ({items: recievedItem, next} = request);
    items.push(...recievedItem);
  } while (next !== null)
  return items;
}

module.exports = {
  getFromSpotifyWithLimits,
  getFromSpotify
}

/*

href:"https://api.spotify.com/v1/me/tracks?offset=0&limit=20"
items:Array(20) [Object, Object, Object, …]
limit:20
next:"https://api.spotify.com/v1/me/tracks?offset=20&limit=20"
offset:0
previous:null
total:544
*/