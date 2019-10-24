import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { connect } from 'react-redux';

import {Menu, Button} from 'semantic-ui-react';
import Login from './Login.jsx';

class MainMenu extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Menu>
        {/* <Menu.Item> <a href="/test?id=kagesennin"><Button className="button">test</Button></a></Menu.Item> */}
        <Menu.Item><Link to='/sync'><Button>Sync Data From Spotify</Button></Link></Menu.Item>
        <Menu.Item><Link to='/smartplaylist'><Button>Smart Playlists</Button></Link></Menu.Item>
        <Menu.Item><Link to='/playlist'><Button>Playlists</Button></Link></Menu.Item>
        <Menu.Item position='right'><Login user={this.props.user}></Login></Menu.Item>
      </Menu>
    )
  }
}

const mapStoreToProps = function ({user}) {
  return {
    user
  }
}

const mapDispatchToProps = {};

export default connect (mapStoreToProps, mapDispatchToProps)(MainMenu)