import React from 'react';
import {connect } from 'react-redux';
import dexieDB from '../services/dixieStore';

import {Grid, Accordion, Segment} from 'semantic-ui-react';
import ListSongs from './listSongsGetFromDB.jsx';

class Playlists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSongs: false,
      playlists: [],
      selected: 0
    }
  }
  async componentDidMount() {
    const playlists = await dexieDB.playlists.toArray();
    console.log (playlists)
    this.setState({playlists});
  }

  render() {
    return (
      <Segment>

      <Accordion fluid>
        {this.state.playlists.map((playlist, index) => (
          <Segment key={playlist.id}>
            <Accordion.Title>{playlist.name}</Accordion.Title>
            <Accordion.Content active={this.state.selected === index}>
              {this.state.selected === index && <ListSongs tracks={playlist.tracks}></ListSongs>}
            </Accordion.Content>
          </Segment>
        ))}
      </Accordion>
        </Segment>
    )
  }
}

const mapStoreToProps = function ({playlists}) {
  return {playlists};
}

export default connect(mapStoreToProps, null)(Playlists)