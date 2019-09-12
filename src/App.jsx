import React from 'react';
import Menu from './components/Menu.jsx';
import SmartPlaylists from './components/ListSmartPlaylists.jsx';
import {Container} from 'semantic-ui-react';
import cookie from 'js-cookie';
import axios from 'axios';

import {connect} from 'react-redux';
import {setUser} from './store/actions/user';
import {setAllPlaylists} from './store/actions/smartPlaylists';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const userID = localStorage.getItem('userID');
    if (cookie.get('koa:sess') && userID) {
      axios.get(`/user/${userID}`)
        .then(({data: {name, accessToken, smartPlaylists, id}}) => {
          this.props.setUser({name, id, accessToken});
          this.props.setAllPlaylists(smartPlaylists);
        })
    }
  }

  render () {
    return (
      <Container>
        <Menu></Menu>
        <SmartPlaylists></SmartPlaylists>
      </Container>
    );
  }
}

export default connect(null, {setUser, setAllPlaylists})(App);