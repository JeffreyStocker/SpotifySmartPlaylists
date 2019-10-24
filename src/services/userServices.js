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

// export const checkAuth = checkAuth;