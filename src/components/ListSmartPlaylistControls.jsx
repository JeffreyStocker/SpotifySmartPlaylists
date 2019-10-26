import React from 'react';
import {Menu, Button} from 'semantic-ui-react';
import ButtonInButtonConfirm from './ButtonInButtonConfirm.jsx';
import ButtonPopOver from './PopOverRequest.jsx';

const PlaylistControls = function ({handleChange, ...props}) {
  return (
    <Menu fluid secondary>
      <Menu.Item><Button color='green' disabled>Save</Button></Menu.Item>
      <Menu.Item><ButtonPopOver text='Enter Text for New Title' buttonText='Edit Title' /></Menu.Item>
      {/* <Menu.Item><Button>Add Rule</Button></Menu.Item> */}
      {/* <Menu.Item><Button>Change Title</Button></Menu.Item> */}
      <Menu.Menu position='right'>
        <Menu.Item><ButtonInButtonConfirm handleChange={handleChange}></ButtonInButtonConfirm></Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default PlaylistControls;