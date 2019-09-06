import React from 'react';
import {connect} from 'react-redux';

import {addPlaylist, removePlaylist, updatePlaylist} from '../store/actions/smartPlaylists';

import {Grid, Card, Accordion, Container, Icon, Segment} from 'semantic-ui-react';
import PlaylistItem from './ListSmartPlaylist_Item.jsx';

const handleUpdatePlaylist = function (updatePlaylist, playlist, index) {
  updatePlaylist(playlist, index);

}
const handleRemovePlaylist = function (removePlaylist, index) {
  removePlaylist(index);
}
const handleAddPlaylist = function (addPlaylist, index) {
  addPlaylist(index);
}

class ListSmartPlaylist extends React.Component{
  constructor(props) {
    super(props);
    this.state = {activeIndex: 0};
    this.handleAccordianClick = this.handleAccordianClick.bind(this);

  }

  handleAccordianClick(index) {
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    console.log ('run', index)
    this.setState({ activeIndex: newIndex })

  }

  render() {
    const {smartPlaylists} = this.props;
    const {state: {activeIndex}} = this;

    return (
      // <Grid container columns={1}>
      //   {smartPlaylists.map((playlist, index) => (
      //     <Grid.Row key={playlist.spotifyID}>
      //       <PlaylistItem
      //         index={index}
      //         playlist={playlist}
      //         addPlaylist={() => handleAddPlaylist(props.addPlaylist, index)}
      //         removePlaylist={() => handleRemovePlaylist(props.removePlaylist, index)}
      //         updatePlaylist={() => handleUpdatePlaylist(props.updatePlaylist, playlist, index)}
      //       />
      //   </Grid.Row>
      //   ))}
      // </Grid>
      <Accordion fluid>
        {
          smartPlaylists.map((playlist, index) => (
          <Segment key={playlist.spotifyID}>
            <Accordion.Title onClick={() => this.handleAccordianClick(index)} active={activeIndex === index}>
              <Icon name='dropdown' />{playlist.name}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === index}>
              <PlaylistItem
                index={index}
                playlist={playlist}
                addPlaylist={() => handleAddPlaylist(props.addPlaylist, index)}
                removePlaylist={() => handleRemovePlaylist(props.removePlaylist, index)}
                updatePlaylist={() => handleUpdatePlaylist(props.updatePlaylist, playlist, index)}
              />
            </Accordion.Content>
          </Segment>
          ))
        }
      </Accordion>
    )
  }
}

const mapStateToProps = function mapStateToProps ({smartPlaylists}) {
  return {smartPlaylists}
}

const actions = {
  addPlaylist, removePlaylist, updatePlaylist
}

export default connect(mapStateToProps, actions)(ListSmartPlaylist);