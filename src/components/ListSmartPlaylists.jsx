import React from 'react';
import {connect} from 'react-redux';

import {addPlaylist, removePlaylist, updatePlaylist} from '../store/actions/smartPlaylists';

import {Grid, Card} from 'semantic-ui-react';
import PlaylistItem from './Playlist_Item.jsx';

function ListSmartPlaylist (props) {
  return (
    <div>
      <Grid container columns={1}>

        <Grid.Row>
          <Card fluid>
            <Card.Content>

              <PlaylistItem>
              </PlaylistItem>
            </Card.Content>
          </Card>
        </Grid.Row>
      </Grid>
    </div>
  )
}

const mapStateToProps = function mapStateToProps (state) {
  return {smartPlaylists}
}

const mapActionsToProps = function mapActionsToProps () {
  return {addPlaylist, removePlaylist, updatePlaylist};
}


export default connect(mapStateToProps, mapActionsToProps)(ListSmartPlaylist);