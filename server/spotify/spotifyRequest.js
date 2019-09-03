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
    return res.data;
  })
  .catch(err => {
    if (err.code === "ECONNREFUSED"){
      console.log ('err.refused', console.error (err))
    } else if (err && err.response && err.response.status) {
      switch (err.response.status) {
        case 401:
            if (firstRun) {
              firstRun = false;
              return getAndUpdateRefreshToken(accessToken)
                .then(newToken => {
                  const newRequestOptions = generateRequestOptions(newToken, options);
                  return request(url, newRequestOptions)
                })
            }
          break;
        case 429:
          //wip
          const timeout = err.Retry-After
          return new Promise ((resolve, revoke) => {
            setTimeout(() => {
              request (url, accessToken, options)
              .then(resolve)
                .catch(revoke)
              }, timeout)
          })
          break;
        default:
          break;
        }
        return null;
      }
    })
}

const getFromSpotifyWithLimits = async function getFromSpotifyWithLimits(url, accessToken, options = {}) {
  const items = [];
  let next = url;

  do {
    let request = await getFromSpotify(next, accessToken, generateRequestLimitOptions(accessToken, options))
      .then(data => data);
    if (request !== null) {
      ({items: recievedItem, next} = request);
      items.push(...recievedItem);
    }
  } while (next !== null)
  return items;
}


/**
 *
 * @param {String} url url target to spotify
 * @param {String} accessToken access token from spotify
 * @param {Array} ids array of ids strings
 * @returns {Promise<array of responses} will return an array of responses from spotify
 */
const getFromSpotifyByIds = function getFromSpotifyByIds (url, accessToken, ids) {
  requestsIDs = [];
  for (let i = 0; i < ids.length; i += REQUEST_LIMIT) {
    const currentIds = ids.slice(i, i + REQUEST_LIMIT)

    requestsIDs.push(getFromSpotify(url, accessToken, {
      params: {
        ids: currentIds.join(',')
      }
    }))
  }
  return Promise.all(requestsIDs);
}

module.exports = {
  getFromSpotifyWithLimits,
  getFromSpotify,
  getFromSpotifyByIds
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