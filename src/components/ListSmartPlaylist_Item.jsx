import React from 'react';
import {Grid, Transition, Accordion, Button, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {addRulePlaylist, removeRulePlaylist, removePlaylist, updateRuleByIndex} from '../store/actions/smartPlaylists';
import { removeSmartPlaylist } from '../thunks/deleteSmartPlaylists';
import { updatePlaylistRule, savePlaylist } from '../thunks/smartPlaylists';
import Options from './ListSmartPlaylists_Options.jsx';
import UpAndDownArrow from './UpAndDownArrow.jsx';
import ListSongs from './ListSongs.jsx';
import PlaylistControls from './ListSmartPlaylistControls.jsx';
import PropTypes from 'prop-types';
import RuleGroup from './ListSmartPlaylist_RuleGroup.jsx';

class Playlist_Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOptions: false,
      isVisibleRules: true,
      subpanelIndex: null
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleAddRule = this.handleAddRule.bind(this);
    this.handleRemoveRule = this.handleRemoveRule.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
    this.handleUpdateRule = this.handleUpdateRule.bind(this);
    this.handlePlaylistSave = this.handlePlaylistSave.bind(this);
  }

  handleOptionChange(index) {
    this.setState({subpanelIndex: this.state.subpanelIndex === index ? null : index});
  }

  handleIsVisibleRuleChange() {
    this.setState({isVisibleRules: !this.state.isVisibleRules});
  }

  handleAddRule (evt, index) {
    this.props.addRulePlaylist(this.props.playlist, index);
  }

  handleRemoveRule (evt, index) {
    this.props.removeRulePlaylist(this.props.playlist, index);
  }

  deletePlaylist () {
    removeSmartPlaylist(this.props.playlist);
  }

  handleUpdateRule (index, updatedRule) {
    updatePlaylistRule(this.props.playlist, index, updatedRule);
  }

  handlePlaylistSave () {
    savePlaylist(this.props.playlist);
  }

  render () {
    const {
      state: { isVisibleRules, displayOptions, subpanelIndex },
      props: { playlist },
      handleAddRule,
    } = this;

    return (
      <Transition>
        <Grid container columns={7}>
          <Grid.Row>
            <PlaylistControls
              handleChange={this.deletePlaylist}
              handlePlaylistSave={this.handlePlaylistSave}
              modified={playlist.modified}
            />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2} onClick={(evt) => handleAddRule(evt, -1, playlist)} verticalAlign="middle">
              <Button><Icon name='plus circle'></Icon></Button>
            </Grid.Column>
            <Grid.Column width={4}>Primary</Grid.Column>
            <Grid.Column width={4}>Conditions</Grid.Column>
            <Grid.Column width={6}>Target</Grid.Column>
          </Grid.Row>

          {playlist.rules.map((rule, index) => (
            <RuleGroup onChange={(updatedRule) => this.handleUpdateRule(index, updatedRule)} key={index} rule={rule}/>
          ))}

          <Grid.Row>
            <Grid.Column width={16}>
              <Accordion>
                <Accordion.Title
                  active={subpanelIndex === 0}
                  onClick={(evt, props) => this.handleOptionChange(0)}
                >
                  <UpAndDownArrow isUp={displayOptions}/> Options
                </Accordion.Title>
                <Accordion.Content active={subpanelIndex === 0}>
                  <Options options={playlist.options}></Options>
                </Accordion.Content>

                <Accordion.Title
                  active={subpanelIndex === 1}
                  onClick={(evt, props) => this.handleOptionChange(1)}
                >
                  <UpAndDownArrow isUp={displayOptions}/>
                  Songs
                </Accordion.Title>
                <Accordion.Content active={subpanelIndex === 1}>
                  {subpanelIndex === 1 && <ListSongs tracks={[]} />}
                </Accordion.Content>
              </Accordion>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Transition>
    );
  }
}

Playlist_Item.propTypes = {
  playlist: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  addRulePlaylist, removeRulePlaylist, removePlaylist
};

export default connect(null, mapDispatchToProps)(Playlist_Item);