import React from 'react';
import {Container, Checkbox, Transition, Input, Label, Menu} from 'semantic-ui-react';
import _set from 'lodash/set';
import _get from 'lodash/get';
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
  }

  updateCheckBox (evt, target) {
    evt.persist();
    const options = this.props.options
    const val = _get(options, target)
    _set(options, target, !val)
    this.emitUptheChain(options);
    console.log(evt.target.value, target, _get(options, target))
  }

  updateInput (evt, target) {
    evt.persist();
    const options = this.props.options
    const val = evt.target.value;
    debugger;
    if (isNaN(val) || val === '') {
      this.setState({isInvalidInput: true})
    } else {
      this.setState({isInvalidInput: false})
      _set(options, target, val)
      this.emitUptheChain(options);
    }
    console.log(evt.target.value, target, _get(options, target))
  }

  emitUptheChain(options) {
    this.props.onChange && onChange(options);
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
          {/* {Object.entries(options).map(([name, value]) => {
            const type = typeof value ;
            if (type === 'object') {
              return <Checkbox label="Liked Tracks"></Checkbox>
            } else if (type === 'boolean') {
              return <Checkbox label="Liked Tracks"></Checkbox>
            } else if (type === 'number') {
              return <Input label="Track Limit" type="number" placeholder="crazy"></Input>
            }
          })} */}
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
          <Menu width={3}>
            <Menu.Item>
              <Label>Sources</Label>
            </Menu.Item>
            <Menu.Item>
              <Checkbox label="Liked Albums" checked={_get(options, 'sources.likedAlbums')} onChange={() => this.updateCheckBox(evt, 'sources.likedAlbums')}></Checkbox>
            </Menu.Item>
            <Menu.Item>
              <Checkbox label="Liked Tracks" checked={_get(options, 'sources.likedTracks')} onChange={() => this.updateCheckBox(evt, 'sources.likedTracks')}></Checkbox>
            </Menu.Item>
          </Menu>
        </Container>
    )
  }
}

export default React.memo(PlaylistOptions);

/*
    <Transition visible={isOpen}>
    </Transiion>
t
 */