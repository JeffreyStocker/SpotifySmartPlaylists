import axios from 'axios';

/**
 *
 */
// const checkAuth = async function checkAuth() {
//   return axios
// }

/**
 *
 * @param {String} userID userID, ususally from cookie
 * @returns {Promise} axios promise for network request for user information
 */
export function getUser (userID) {
  return axios.get(`/user/${userID}`);
}

export function logoutUser (userID) {
  return axios.get (`/logout/${userID}`);
}

export function getUpdatedAccessToken(userID) {
  return axios.get('authorize/refresh');
}
// export const checkAuth = checkAuth;