import React from 'react';
import {Accordion, Icon, Segment, Message, Menu, Container, Button} from 'semantic-ui-react';
import PlaylistItem from './ListSmartPlaylist_Item.jsx';
import Editable from './TitleEditable.jsx';

import {connect} from 'react-redux';
import {addPlaylist, removePlaylist, updatePlaylist} from '../store/actions/smartPlaylists';
import {requestAddToPlaylist} from '../services/smartPlaylistServices';


class ListSmartPlaylist extends React.Component{
  constructor(props) {
    super(props);
    this.state = {activeIndex: -1};
    this.handleAccordianClick = this.handleAccordianClick.bind(this);
    this.handleNewPlaylist = this.handleNewPlaylist.bind(this);
    this.handleUpdatePlaylist = this.handleUpdatePlaylist.bind(this);
    this.handleRemoveRule = this.handleRemoveRule.bind(this);
    this.handleAddRule = this.handleAddRule.bind(this);
  }

  handleAccordianClick(index) {
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  handlePlaylistUpdate() {
    //wip
  }

  handleNewPlaylist () {
    const id = this.props.user && this.props.user.id;
    if (id) {
      requestAddToPlaylist(id)
        .then(playlistData => {
          this.props.addPlaylist(playlistData);
        })
    }
    this.setState({activeIndex: -1})
  }

  handleUpdatePlaylist (playlist, index) {
    this.updatePlaylist(playlist, index);
  }

  handleRemoveRule (index) {
    this.removePlaylist(index);
  }

  handleAddRule (index) {
    this.addPlaylist(index);
  }

  render() {
    const {smartPlaylists} = this.props;
    const {state: {activeIndex}} = this;

    return (
      <Container fluid>
        <Menu secondary>
          <Menu.Item><Button onClick={this.handleNewPlaylist}>Add Playlist</Button></Menu.Item>
        </Menu>
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
                    addPlaylist={() => handleAddRule(index)}
                    removePlaylist={() => handleRemoveRule(index)}
                    updatePlaylist={() => handleUpdatePlaylist(playlist, index)}
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
      </Container>
    )
  }
}

const mapStateToProps = function mapStateToProps ({smartPlaylists, user}) {
  return {smartPlaylists, user}
}

const actions = {
  addPlaylist, removePlaylist, updatePlaylist
}

export default connect(mapStateToProps, actions)(ListSmartPlaylist);