const {getFromSpotify, getFromSpotifyByIds} = require ('./spotifyRequest');
const {
  getArtistsURL,
  getArtistAlbumbsURL,
  getArtistsTopTracksURL,
  getArtistsRelatedArtistsURL,
  getArtistURL
} = require ('../constants');

const getArtists = function (accessToken, ids = []){
  return getFromSpotifyByIds(getArtistsURL(), accessToken, ids)
    .then(responses => {
      console.log (responses)
      return responses.reduce((acc, response) => {
        response && response.artists && Array.isArray(response.artists) && acc.push(...response.artists)
        return acc;
      }, [])
    })
}

module.exports = {
  getArtists
}