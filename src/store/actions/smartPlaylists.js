const ADD_PLAYLIST = 'ADD_PLAYLIST';
const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST';
const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';

export function addPlaylist (playlist, index = null) {
  return {
    type: ADD_PLAYLIST,
    payload: {
      index,
      playlist
    }
  }
}
export function removePlaylist (playlist, index = null) {
  return {
    type: REMOVE_PLAYLIST,
    payload: {
      index,
      playlist
    }
  }
}
export function updatePlaylist (playlist, index) {
  return {
    type: UPDATE_PLAYLIST,
    payload: {
      index,
      playlist
    }
  }
}