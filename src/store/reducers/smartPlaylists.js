import {
  ADD_PLAYLIST,
  REMOVE_PLAYLIST,
  UPDATE_PLAYLIST,
  ADD_RULE_PLAYLIST,
  REMOVE_RULE_PLAYLIST,
  SET_ALL_PLAYLISTS,
} from '../actions/smartPlaylists'

const defaultPlaylist = function () {
  return {
    name: 'test',
    spotifyID: Math.random(),
    rules: [],
    options: {
      liveUpdate: false,
      limit: 10000,
      sources: {
        likedAlbums: true,
        likedSongs: true,
        playLists: {
          owned: true,
          collaborative: false,
          followed: false
        },
      }
    },
  }
}

const reducer = function (state = [], action) {
  const {type, payload} = action;
  let newState;
  let playlist, index, origPlaylist;

  switch(type) {
    case ADD_PLAYLIST:
      if (payload.index === null) {
        let playlist = payload.playlistData ? payload.playlistData : defaultPlaylist();
        newState = [...state, playlist];
      } else (
        newState = [...state.slice(0, payload.index),  playlist, ...state.slice(payload.index)]
      )

      break;

    case REMOVE_PLAYLIST:
      newState = [...state.slice(0, payload.index), ...state.slice(payload.index + 1)]
      break;

    case UPDATE_PLAYLIST:
      break;

    case ADD_RULE_PLAYLIST:
      ({index, playlist: origPlaylist} = payload)

      newState = state.map((playlist) => {
        const rules = playlist.rules;

        if (playlist === origPlaylist) {
          if (payload.index === -1) {
          playlist.rules = [{}, ...rules];
          } else {
            playlist.rules = [...rules.slice(0, index), {}, ...rules.slice(index)]
          }
        }
        return playlist;
      })
      break;

    case REMOVE_RULE_PLAYLIST:
      ({index, playlist: origPlaylist} = payload);

      newState = state.map((playlist) => {
        const rules = playlist.rules;

        if (playlist === origPlaylist) {
          playlist.rules = [...rules.slice(0, index), ...rules.slice(index + 1)]
        }
        return playlist;
      })
      break;

    case SET_ALL_PLAYLISTS:
      newState = payload;
      break;
  }
  return newState ? newState : state;
}

export default reducer;