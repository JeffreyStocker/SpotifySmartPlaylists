import {logoutUser} from '../services/userServices';
import store from '../store/store';
import {setUser} from '../store/actions/user';
import {setAllPlaylists} from '../store/actions/smartPlaylists';
import cookie from 'js-cookie';

export default function logout (userID) {
  return logoutUser(userID)
    .then(() => {
      store.dispatch(setUser({name: null}));
      store.dispatch (setAllPlaylists([]));
      cookie.remove('koa:sess', { path: '' });
    })
    .catch(err => {
      console.error ('error logging out', err);
    });
}