const {combineReducers} = require ('redux');
const playlists = require ('./playlists');

const reducers = combineReducers({
  playlists
})

module.exports = reducers;