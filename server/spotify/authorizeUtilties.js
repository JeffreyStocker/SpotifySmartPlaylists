const {toString64} = require ('../utilities/utilityString');

const generateBasicAuthorizationStr = function generateBasicAuthorizationStr (clientID, clientSECRET) {
  return "Basic " + toString64(clientID+":"+clientSECRET);
}

const generateAccessAuthorizationStr = function generateAccessAuthorizationStr (accessToken) {
  return `Bearer ${accessToken}`;
}

module.exports = {
  generateBasicAuthorizationStr,
  generateAccessAuthorizationStr
}