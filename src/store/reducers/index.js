import {combineReducers} from 'redux';
import playlists from './playlists';
import smartPlaylists from './smartPlaylists'

export default combineReducers({
  playlists,
  smartPlaylists
})
