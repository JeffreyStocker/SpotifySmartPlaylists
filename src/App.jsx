import React from 'react';
import Menu from './components/Menu.jsx';
import SmartPlaylists from './components/ListSmartPlaylists.jsx';
import {Container, Loader} from 'semantic-ui-react';
import cookie from'js-cookie';
import axios from 'axios';
import ShowSync from './components/ShowSync.jsx';
import ListPlaylists from './components/ListPlaylists.jsx';

import {connect} from 'react-redux';
import {setUser} from './store/actions/user';
import {setAllPlaylists} from './store/actions/smartPlaylists';

const test = function test (props) {
  return (
    <div>
      {props.children.forEach()}
    </div>
  )
}

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
        {!this.props.user && <Message>Login To Continue</Message>}
        {this.props.user &&
          <React.Fragment>
            {this.props.views.main === 'smartPlaylist' && <SmartPlaylists></SmartPlaylists>}
            {this.props.views.main === 'syncSpotify' && <ShowSync/>}
            {this.props.views.main === 'playlist' && <ListPlaylists/>}
          </React.Fragment>
        }

        {!this.props.user && <Loader>Testing</Loader>}

      </Container>
    );
  }
}

const mapStoreToProps = function ({views, user}) {
  return {
    views,
    user
  }
}

export default connect(mapStoreToProps, {setUser, setAllPlaylists})(App);