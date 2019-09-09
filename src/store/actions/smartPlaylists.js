export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST';
export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';
export const ADD_RULE_PLAYLIST = 'ADD_RULE_PLAYLIST';
export const REMOVE_RULE_PLAYLIST = 'REMOVE_RULE_PLAYLIST';
export const SET_ALL_PLAYLISTS = 'SET_ALL_PLAYLISTS';

export function setAllPlaylists (smartPlaylists) {
  return {
    type: SET_ALL_PLAYLISTS,
    payload: smartPlaylists
  }
}

export function addPlaylist (index = null) {
  return {
    type: ADD_PLAYLIST,
    payload: {
      index
    }
  }
}

export function removePlaylist (index = null) {
  return {
    type: REMOVE_PLAYLIST,
    payload: {
      index
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

export function addRulePlaylist (playlist, index) {
  return {
    type: ADD_RULE_PLAYLIST,
    payload: {
      playlist,
      index
    }
  }
}

export function removeRulePlaylist (playlist, index) {
  return {
    type: REMOVE_RULE_PLAYLIST,
    payload: {
      playlist,
      index
    }
  }
}

export default null;