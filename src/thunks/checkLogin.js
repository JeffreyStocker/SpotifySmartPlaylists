import {getUser} from '../services/userServices';
import store from '../store/store';
import {setUser} from '../store/actions/user';
import {setAllPlaylists} from '../store/actions/smartPlaylists';

export default function checkLogin (userID) {
  return getUser(userID)
    .then(({data: {name, accessToken, smartPlaylists, id, accessTokenExpire}}) => {
      store.dispatch(setUser({name, id, accessToken, accessTokenExpire, date: Date.now()}));
      store.dispatch(setAllPlaylists(smartPlaylists));
    })
    .catch(err => {
      console.error (err);
      store.dispatch(setUser({ name: null }));
    });
}

