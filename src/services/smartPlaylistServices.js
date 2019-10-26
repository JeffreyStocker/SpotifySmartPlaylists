import axios from 'axios';

const updatePlaylistRequest = function updatePlaylistRequest (userID, playlistID) {
  return axios.create({
    method: 'PATCH',
    baseURL: `/user/${userID}/smartplaylist/${playlistID}`,
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

const deleteSmartPlaylist = function deleteSmartPlaylist (userID, playlistID) {
  return axios.delete (`/user/${userID}/smartplaylist/${playlistID}`)
    .then(results => {
      if (results.status !== 200) {
        throw new Errow (results);
      }
    });
};

const requestAddToPlaylist = function requestAddToPlaylist (userID) {
  return axios.post(`/user/${userID}/smartplaylist`)
    .then(response => response.data)
    .catch(err => {
      if (err.status === 404) {
        throw new Error ();
      }
    });
};

const updatePlaylist = function updatePlaylist (userID, playlistID, playlistData) {
  if (!userID || !playlistID || !playlistData) {
    throw new Error ('Must supply all variables');
  }
  return axios.patch(`/user/${userID}/smartplaylist/${playlistID}`, {playlist: playlistData}, {
    headers: { 'Content-Type': 'application/json'}
  });
};

export {
  updatePlaylist,
  deleteSmartPlaylist,
  requestAddToPlaylist,
  updatePlaylistRequest
};