import React from 'react';
import Menu from './components/Menu.jsx';
import SmartPlaylists from './components/ListSmartPlaylists.jsx';
import {Container, Loader} from 'semantic-ui-react';
import cookie from'js-cookie';
import axios from 'axios';
import ShowSync from './components/ShowSync.jsx';

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
        {this.props.user &&
          <React.Fragment>
            {this.props.views.main === 'home' && <SmartPlaylists></SmartPlaylists>}
            {this.props.views.main === 'syncSpotify' && <ShowSync/>}
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