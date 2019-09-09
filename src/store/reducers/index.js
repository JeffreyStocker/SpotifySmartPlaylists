import {combineReducers} from 'redux';
import playlists from './playlists';
import smartPlaylists from './smartPlaylists'
import spotifyData from './spotifyData'
import user from './user';

export default combineReducers({
  playlists,
  smartPlaylists,
  spotifyData,
  user
})
