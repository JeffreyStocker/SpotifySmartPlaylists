import React from 'react';
import Login from './Login.jsx'

import {Menu, Button} from 'semantic-ui-react';

const buttonNames = ['playlists'];

export default function Menux () {
  return (
    <Menu>
      <Menu.Item> <Button><Login></Login></Button></Menu.Item>
      <Menu.Item> <a href="/test?id=kagesennin"><Button className="button">test</Button></a></Menu.Item>
    </Menu>
  )
}