import axios from 'axios';

export function deleteSmartPlaylist (userID, playlistID) {
  return axios.post (`/user/${userID}/smartplaylist/${playlistID}`)
    .then(results => {
      if (results.status !== 200) {
        throw new Errow (results);
      }
    })
}

export function requestAddToPlaylist  (userID) {
  return axios.post(`/user/${userID}/smartplaylist`)
    .then(response => response.data)
    .catch(err => {
      if (err.status === 404) {
        throw new Error ()
      }
    })
}

