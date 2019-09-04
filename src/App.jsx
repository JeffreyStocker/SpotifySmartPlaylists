import React from 'react';
import Menu from './components/Menu.jsx';
import Playlists from './components/ListSmartPlaylists';
import {Container} from 'semantic-ui-react';



export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <Container>
        <Menu></Menu>
        <Playlists></Playlists>
      </Container>
    );
  }
}