import React from 'react';
import axios from 'axios';
import qs from 'qs';
import {connect} from 'react-redux';
import {setUser} from '../store/actions/user';
import {setAllPlaylists} from '../store/actions/smartPlaylists';

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
}
const link = `https://accounts.spotify.com/authorize?${qs.stringify(linkOptions)}`

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

  timerFunction () {
    const code = window.localStorage.getItem('code');
    if (code) {
      clearInterval(this.timer);
      window.localStorage.setItem('code', undefined);
      axios.post('/authorize', {code})
      .then(response => {
        this.setState({code: code});
        if (response.status === 200) {
          const {id, name = 'Unnamed', smartPlaylists} = response.data;
          this.props.setUser({id, name});
          this.props.setAllPlaylists(smartPlaylists);
          console.log ('response', response.status, response.data)
          }
        })
        .catch(err => {
          console.log ('err')
        })
    }
  }

  clickLink () {
    delete window.localStorage.code;
    this.timer = setInterval(this.timerFunction, 100)
  }

  render () {
    return (
      <a href={link} onClick={this.clickLink.bind(this)} target="spotify_login">Login</a>
    )
  }
}

const mapDispatchToProps = {
  setUser,
  setAllPlaylists
}

export default connect(null, mapDispatchToProps)(Login)