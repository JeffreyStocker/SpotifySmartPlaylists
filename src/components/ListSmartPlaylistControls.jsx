import React from 'react';
import {Menu, Button} from 'semantic-ui-react';
import ButtonInButtonConfirm from './ButtonInButtonConfirm.jsx';

const PlaylistControls = function (props) {
  return (
    <Menu fluid secondary>
      <Menu.Item><Button>Add Rule</Button></Menu.Item>
      <Menu.Item><Button>Change Title</Button></Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item><ButtonInButtonConfirm handleChange={props.handleChange}></ButtonInButtonConfirm></Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default PlaylistControls