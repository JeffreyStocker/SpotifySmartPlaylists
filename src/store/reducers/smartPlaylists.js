import {
  ADD_PLAYLIST,
  REMOVE_PLAYLIST,
  UPDATE_PLAYLIST,
  ADD_RULE_PLAYLIST,
  REMOVE_RULE_PLAYLIST,
  SET_ALL_PLAYLISTS,
  REMOVE_PLAYLIST_BY_INDEX,
  UPDATE_PLAYLIST_RULE_BY_INDEX
} from '../actions/smartPlaylists';

const defaultPlaylist = function () {
  return {
    name: 'test',
    spotifyID: Math.random(),
    rules: [defaultRule()],
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
  };
};

const defaultRule = function () {
  return {
    isSubrule: false,
    target: '',
    mod: '',
    filter: []
  };
};

const reducer = function (state = [], action) {
  const {type, payload = {}} = action;
  let newState, origPlaylist;
  let {playlist, index, rule} = payload;

  switch (type) {
  case ADD_PLAYLIST:
    playlist.modified = playlist.modified === false ? undefined : true;
    if (payload.index === null) {
      let playlist = payload.playlistData ? payload.playlistData : defaultPlaylist();
      newState = [...state, playlist];
    } else {
      newState = [...state.slice(0, payload.index), playlist, ...state.slice(payload.index)];
    }

    break;

  case REMOVE_PLAYLIST_BY_INDEX:
    newState = [...state.slice(0, payload.index), ...state.slice(payload.index + 1)];
    break;

  case REMOVE_PLAYLIST:
    newState = state.reduce ((acc, statePlaylist) => {
      if (statePlaylist !== playlist) {
        acc.push(statePlaylist);
      }
      return acc;
    }, []);
    break;

  case UPDATE_PLAYLIST:
    playlist.modified = playlist.modified === false ? undefined : true;
    newState = state.map(oldPlaylist => {
      return oldPlaylist._id === playlist._id ? playlist : oldPlaylist;
    });
    break;

  case ADD_RULE_PLAYLIST:
    playlist.modified = playlist.modified === false ? undefined : true;

    ({index, playlist: origPlaylist} = payload);

    newState = state.map((playlist) => {
      const rules = playlist.rules;

      if (playlist === origPlaylist) {
        if (payload.index === -1) {
          playlist.rules = [{}, ...rules];
        } else {
          playlist.rules = [...rules.slice(0, index), {}, ...rules.slice(index)];
        }
      }
      return playlist;
    });
    break;

  case REMOVE_RULE_PLAYLIST:
    ({playlist: origPlaylist} = payload);
    playlist.modified = playlist.modified === false ? undefined : true;

    newState = state.map((playlist) => {
      const rules = playlist.rules;

      if (playlist === origPlaylist) {
        playlist.rules = [...rules.slice(0, index), ...rules.slice(index + 1)];
      }
      return playlist;
    });
    break;

  case SET_ALL_PLAYLISTS:
    newState = payload;
    break;

  case UPDATE_PLAYLIST_RULE_BY_INDEX:
    ({playlist: origPlaylist} = payload);
    playlist.modified = playlist.modified === false ? undefined : true;

    newState = state.map(oldPlaylist => {
      if (oldPlaylist === origPlaylist) {
        const newPlaylist = Object.assign({}, oldPlaylist);
        newPlaylist.rules[index] = rule;
        return newPlaylist;
      }
      return oldPlaylist;
    });
    break;
  }
  return newState ? newState : state;
};

export default reducer;