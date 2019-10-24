import {updatePlaylist as requestUpdatePlaylist} from '../services/smartPlaylistServices';

import store from '../store/store';
import {updatePlaylist as updatePlaylistInStore} from '../store/actions/smartPlaylists';

export async function updatePlaylist (userID, playlist) {
  const results = await requestUpdatePlaylist(userID, playlist._id, playlist);
  store.dispatch(updatePlaylistInStore(playlist));
}

export async function updatePlaylistRule (playlist, indexOfRule, newRule) {
  const state = store.getState();
  const userID = state.user && state.user.id;
  if (userID) {
    const newPlaylist = Object.assign({}, playlist);
    newPlaylist.rules[indexOfRule] = newRule;
    try{
      await updatePlaylist(userID, playlist);
    } catch(err) {
      console.error('could not save', err);
    }
  }
}