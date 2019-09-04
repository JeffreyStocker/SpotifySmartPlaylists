import React from 'react';

import {Grid, Card} from 'semantic-ui-react';
import PlaylistItem from './Playlist_Item.jsx';

export default function ListSmartPlaylist (props) {
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