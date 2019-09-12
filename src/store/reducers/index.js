import {combineReducers} from 'redux';
import playlists from './playlists';
import smartPlaylists from './smartPlaylists'
import spotifyData from './spotifyData'
import user from './user';;
import views from './views';

export default combineReducers({
  playlists,
  smartPlaylists,
  spotifyData,
  user,
  views
})
