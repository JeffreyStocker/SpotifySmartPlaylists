import {deleteSmartPlaylist, requestAddToPlaylist} from '../services/smartPlaylistServices';
import store from '../store/store';
import {removePlaylist} from '../store/actions/smartPlaylists';

export async function removeSmartPlaylist (playlist) {
  const state = store.getState();
  const userID = state.user && state.user.id;
  if (userID) {
    try {
      const confirmation = await deleteSmartPlaylist(state.user.id, playlist._id);
      const deleteAction = removePlaylist(playlist)
      store.dispatch(deleteAction);

    } catch(err) {
      console.error (err)
    }
  } else {
    console.error ('missing user ID');
  }
}