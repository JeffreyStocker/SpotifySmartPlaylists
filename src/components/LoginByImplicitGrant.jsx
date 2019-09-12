import React from 'react';
import qs from 'qs';
import {connect} from 'react-redux';
import {setUser} from '../store/actions/user';
import {setAllPlaylists} from '../store/actions/smartPlaylists';
import {IMPLICIT_GRANT_ACCESS_URL} from '../../server/constants';

const linkOptions = {
  scope: [
    'user-library-read',
    'playlist-read-private',
    'playlist-modify-private',
    'playlist-modify-public']
    .join(' '),
  response_type: 'token',
  redirect_uri: process.env.SPOTIFY_REDIRECT,
  client_id: process.env.CLIENT_ID,
}
const link = `${IMPLICIT_GRANT_ACCESS_URL}?${qs.stringify(linkOptions)}`

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null
    }
    this.timer = null;
    this.timerFunction = this.timerFunction.bind(this);
    this.clickLink = this.clickLink.bind(this);
  }

  clearSessionStorage () {
    delete window.localStorage.access_token;
    delete window.localStorage.token_type;
    delete window.localStorage.access_token;
    delete window.localStorage.expires_in;
    delete window.localStorage.code;
  }

  timerFunction () {
    const access_token = window.localStorage.getItem('access_token');
    const token_type = window.localStorage.getItem('token_type');
    const expires_in = window.localStorage.getItem('expires_in');
    const state = window.localStorage.getItem('state');

    if (access_token) {
      clearInterval(this.timer);
      clearSessionStorage();
    }
  }

  clickLink () {
    clearSessionStorage();
    this.timer = setInterval(this.timerFunction, 100)
  }

  render () {
    return (
      <a href={link} onClick={this.clickLink.bind(this)} target="spotify_login">{this.props.children ? this.props.children : 'Login'}</a>
    )
  }
}

const mapDispatchToProps = {
  setUser,
  setAllPlaylists
}

export default connect(null, mapDispatchToProps)(Login)