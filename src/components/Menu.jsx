import React from 'react';

import {Menu, Button} from 'semantic-ui-react';
import Login from './Login.jsx'

import { connect } from 'react-redux';
import {requestAddToPlaylist} from '../services/smartPlaylistServices';
import {addPlaylist} from '../store/actions/smartPlaylists';
import {changeMainView} from '../store/actions/views';


class MainMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleNewPlaylist = this.handleNewPlaylist.bind(this);
    this.handleSyncSongs = this.handleSyncSongs.bind(this);
  }

  handleNewPlaylist () {
    const id = this.props.user && this.props.user.id;
    if (id) {
      requestAddToPlaylist(id)
        .then(playlistData => {
          this.props.addPlaylist(playlistData);
        })
    }
  }

  handleSyncSongs () {
    this.props.changeMainView('syncSpotify');
  }

  render () {
    return (
      <Menu>
        <Menu.Item> <Button><Login></Login></Button></Menu.Item>
        <Menu.Item> <Button onClick={this.handleNewPlaylist}>Add Smart Playlist</Button></Menu.Item>
        <Menu.Item> <a href="/test?id=kagesennin"><Button className="button">test</Button></a></Menu.Item>
        <Menu.Item><Button onClick={this.handleSyncSongs}>Sync Data From Spotify</Button></Menu.Item>
      </Menu>
    )
  }
}

const mapStoreToProps = function ({user}) {
  return {
    user
  }
}

const mapDispatchToProps = {
  addPlaylist,
  changeMainView
};

export default connect (mapStoreToProps, mapDispatchToProps)(MainMenu)