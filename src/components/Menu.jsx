import React from 'react';
import Login from './Login.jsx'
import {requestAddToPlaylist} from '../services/smartPlaylistServices';
import store from '../store/store';
import {addPlaylist} from '../store/actions/smartPlaylists';

import {Menu, Button} from 'semantic-ui-react';

const buttonNames = ['playlists', 'Add Smartplaylist'];

const handleNewPlaylist = function () {
  const state = store.getState();
  if (state.user.id) {
    requestAddToPlaylist(state.user.id)
      .then(playlistData => {
        const action = addPlaylist(playlistData);
        store.dispatch(action);
      }).catch(err => {

      })
  }
}

export default function Menux () {
  return (
    <Menu>
      <Menu.Item> <Button><Login></Login></Button></Menu.Item>
      <Menu.Item> <Button onClick={handleNewPlaylist}>Add Smart Playlist</Button></Menu.Item>
      <Menu.Item> <a href="/test?id=kagesennin"><Button className="button">test</Button></a></Menu.Item>
    </Menu>
  )
}