import React from 'react';
import {connect} from 'react-redux';

import {addPlaylist, removePlaylist, updatePlaylist} from '../store/actions/smartPlaylists';

import {Accordion, Icon, Segment, Message} from 'semantic-ui-react';
import PlaylistItem from './ListSmartPlaylist_Item.jsx';
import Editable from './TitleEditable.jsx'

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
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  handlePlaylistUpdate() {

  }

  render() {
    const {smartPlaylists} = this.props;
    const {state: {activeIndex}} = this;

    return (
      <Accordion fluid>
        { smartPlaylists.length > 0
          ?
            smartPlaylists.map((playlist, index) => (
            <Segment key={playlist._id}>
              <Accordion.Title onClick={() => this.handleAccordianClick(index)} active={activeIndex === index}>
                <Icon name='dropdown' /><Editable text={playlist.name}/>
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
          :
            <Message>
              <Message.Header>Smart Playlists</Message.Header>
              <Message.Content>No Smart Playlists</Message.Content>
            </Message>
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