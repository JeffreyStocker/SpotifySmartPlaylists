import {combineReducers} from 'redux';
import playlists from './playlists';
import smartPlaylists from './smartPlaylists'
import spotifyData from './spotifyData'

export default combineReducers({
  playlists,
  smartPlaylists,
  spotifyData,
})
