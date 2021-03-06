export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST';
export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';
export const ADD_RULE_PLAYLIST = 'ADD_RULE_PLAYLIST';
export const REMOVE_RULE_PLAYLIST = 'REMOVE_RULE_PLAYLIST';
export const SET_ALL_PLAYLISTS = 'SET_ALL_PLAYLISTS';
export const REMOVE_PLAYLIST_BY_INDEX = 'REMOVE_PLAYLIST_BY_INDEX';
export const UPDATE_PLAYLIST_RULE_BY_INDEX = 'UPDATE_PLAYLIST_RULE_BY_INDEX';

export function setAllPlaylists (smartPlaylists) {
  return {
    type: SET_ALL_PLAYLISTS,
    payload: smartPlaylists
  }
}

export function addPlaylist (playlistData, index = null) {
  return {
    type: ADD_PLAYLIST,
    payload: {
      playlistData,
      index
    }
  }
}

export function removePlaylistByIndex (index = null) {
  return {
    type: REMOVE_PLAYLIST_BY_INDEX,
    payload: {
      index
    }
  }
}

export function removePlaylist (playlist) {
  return {
    type: REMOVE_PLAYLIST,
    payload: {
      playlist
    }
  }
}

export function updatePlaylist (playlist) {
  return {
    type: UPDATE_PLAYLIST,
    payload: {
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

export function updateRuleByIndex (playlist, index, updatedRule) {
  return {
    type: UPDATE_PLAYLIST_RULE_BY_INDEX,
    payload: {
      playlist,
      index,
      rule: updatedRule
    }
  }
}



export default null;