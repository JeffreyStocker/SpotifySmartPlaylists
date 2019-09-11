import axios from 'axios';

export default function requestAddToPlaylist  (userID) {
  return axios.post(`/user/${userID}/smartplaylist`)
    .then(response => response.data)
    .catch(err => {
      if (err.status === 404) {
        throw new Error ()
      }
    })
}