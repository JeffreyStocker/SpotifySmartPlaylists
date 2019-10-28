import React from 'react';
import {Container, Checkbox, Input, Label, Menu} from 'semantic-ui-react';
import _set from 'lodash/set';
import _get from 'lodash/get';
import _map from 'lodash/map';
import { MAX_ITEMS_PER_PLAYLIST, MIN_ITEMS_PER_PLAYLIST } from '../../server/constants';

const PlaylistOptions = class PlaylistOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInvalidInput: false
    };

    this.updateCheckBox = this.updateCheckBox.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.emitUptheChain = this.emitUptheChain.bind(this);
    this.handleAllPlaylistsClick = this.handleAllPlaylistsClick.bind(this);
  }

  updateCheckBox (evt, target) {
    evt.persist();
    const options = this.props.options;
    const val = _get(options, target);
    _set(options, target, !val);
    this.emitUptheChain(options);
  }

  updateInput (evt, target) {
    evt.persist();
    const options = this.props.options;
    const val = evt.target.value;
    debugger;
    if (isNaN(val) || val === '') {
      this.setState({isInvalidInput: true});
    } else {
      this.setState({isInvalidInput: false});
      _set(options, target, val);
      this.emitUptheChain(options);
    }
    console.log(evt.target.value, target, _get(options, target));
  }

  emitUptheChain(options) {
    this.props.onChange && this.props.onChange(options);
  }

  isAllPlaylistOptionSelected (playlistsOptions) {
    return Object.values(playlistsOptions).reduce((allSelected, value) => {
      if (value === true || allSelected === true) {
        return true;
      } return allSelected;
    }, false);
  }

  handleAllPlaylistsClick() {
    const val = !this.isAllPlaylistOptionSelected(this.props.options.sources.playlists);
    const options = this.props.options;
    for (const key of Object.keys(options.sources.playlists)) {
      options.sources.playlists[key] = val;
    }
    this.emitUptheChain(options);
  }

  render() {
    const {
      isOpen = false,
      options = {
        autoUpdate: false
      }
    } = this.props;
    return (
      <Container fluid>
        <Menu width={3}>
          <Menu.Item>
            <Checkbox label="Auto-Update" checked={_get(options, 'auotUpdate')} onChange={(evt) => this.updateCheckBox(evt, 'autoUpdate')}></Checkbox>
          </Menu.Item>
          <Menu.Item>
            <Checkbox label="Auto Delete" checked={_get(options, 'autoDelete')} onChange={(evt) => this.updateCheckBox(evt, 'autoDelete')}></Checkbox>
          </Menu.Item>
          <Menu.Item>
            <Input label="Track Limit"
              type="number"
              max={MAX_ITEMS_PER_PLAYLIST}
              min={MIN_ITEMS_PER_PLAYLIST}
              placeholder="0 To 10000"
              value={_get(options, 'limit')}
              onChange={(evt) => this.updateInput(evt, 'limit')}
              error={this.state.isInvalidInput}
            >
            </Input>
          </Menu.Item>
        </Menu>
        <Menu widths={4} attached='top'>
          <Menu.Item><Label>Sources</Label></Menu.Item>
        </Menu>
        <Menu widths={4} attached={true}>
          <Menu.Item>
            <Checkbox
              label="Liked Albums"
              checked={_get(options, 'sources.likedAlbums')}
              onChange={(evt) => this.updateCheckBox(evt, 'sources.likedAlbums')} />
          </Menu.Item>
          <Menu.Item>
            <Checkbox
              label="Liked Tracks"
              checked={_get(options, 'sources.likedTracks')}
              onChange={(evt) => this.updateCheckBox(evt, 'sources.likedTracks')}
            />
          </Menu.Item>
          <Menu.Item>
          </Menu.Item>
          <Menu.Item></Menu.Item>
        </Menu>
        <Menu widths={4} attached='bottom'>
          <Menu.Item>
            <Label>Playlists Options</Label>
            <Checkbox checked={this.isAllPlaylistOptionSelected(_get(options, 'sources.playlists'))} onClick={this.handleAllPlaylistsClick}/>
          </Menu.Item>
          <Menu.Item>
            <Checkbox label="Owned" checked={_get(options, 'sources.playlists.owned')} onChange={(evt) => this.updateCheckBox(evt, 'sources.playlists.owned')}/>
          </Menu.Item>
          <Menu.Item>
            <Checkbox label="Followed" checked={_get(options, 'sources.playlists.followed')} onChange={(evt) => this.updateCheckBox(evt, 'sources.playlists.followed')}/>
          </Menu.Item>
          <Menu.Item>
            <Checkbox label="Collaborative" checked={_get(options, 'sources.playlists.collaborative')} onChange={(evt) => this.updateCheckBox(evt, 'sources.playlists.collaborative')}/>
          </Menu.Item>
        </Menu>
      </Container>
    );
  }
};

export default PlaylistOptions;