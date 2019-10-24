import React from 'react';
import axios from 'axios';
import qs from 'qs';
import {Button} from 'semantic-ui-react';

import {connect} from 'react-redux';
import {setUser} from '../store/actions/user';
import {setAllPlaylists} from '../store/actions/smartPlaylists';
import logMeOut from '../thunks/logout';

const link_backup = `https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.SPOTIFY_REDIRECT}`;
const linkOptions = {
  scope: [
    'user-library-read',
    'playlist-read-private',
    'playlist-modify-private',
    'playlist-modify-public']
    .join(' '),
  response_type: 'code',
  redirect_uri: process.env.SPOTIFY_REDIRECT,
  client_id: process.env.CLIENT_ID,
};
const link = `https://accounts.spotify.com/authorize?${qs.stringify(linkOptions)}`;

const isLoggedIn = function isLoggedIn (user) {
  if (user && user.name) {
    return true;
  }
  return false;
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null
    };
    this.timer = null;
    this.timerFunction = this.timerFunction.bind(this);
    this.clickLink = this.clickLink.bind(this);
  }

  timerFunction () {
    const code = window.localStorage.getItem('code');
    if (code) {
      clearInterval(this.timer);
      window.localStorage.setItem('code', undefined);
      axios.post('/authorize', {code})
        .then(response => {
          this.setState({code: code});
          if (response.status === 200) {
            const {id, name = 'Unnamed', smartPlaylists, acessToken} = response.data;
            this.props.setUser({id, name, acessToken});
            this.props.setAllPlaylists(smartPlaylists);
            localStorage.setItem('userID', id);
            console.log ('response', response.status, response.data);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  clickLink () {
    console.log (isLoggedIn(this.props.user));
    if (isLoggedIn(this.props.user)) {
      delete window.localStorage.code;
      logMeOut(this.props.user.name);
    } else {
      delete window.localStorage.code;
      this.timer = setInterval(this.timerFunction, 100);
    }
  }

  render () {
    return (
      <React.Fragment>
        {
          isLoggedIn(this.props.user) ?
            <Button onClick={this.clickLink.bind(this)}>Logout</Button> :
            <a href={link} onClick={this.clickLink.bind(this)} target="spotify_login"><Button>Login</Button></a>
        }
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  setUser,
  setAllPlaylists
};

export default connect(null, mapDispatchToProps)(Login);