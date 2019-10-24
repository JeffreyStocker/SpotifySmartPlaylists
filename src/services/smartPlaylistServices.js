import axios from 'axios';

let updatePlaylistRequest = function (userID, playlistID) {
  return axios.create({
    method: 'PATCH',
    baseURL: `/user/${userID}/smartplaylist/${playlistID}`,
    headers: {
      'Content-Type': 'application/json'
    },
  });
}

export function deleteSmartPlaylist (userID, playlistID) {
  return axios.delete (`/user/${userID}/smartplaylist/${playlistID}`)
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

export function updatePlaylist (userID, playlistID, playlistData) {
  // const request = updatePlaylistRequest(userID, playlistID);

  return axios.patch(`/user/${userID}/smartplaylist/${playlistID}`,{playlist: playlistData} ,  {
    // data: JSON.stringify({playlist: playlistData}),
    headers: { 'Content-Type': 'application/json'}
    }
  )
}