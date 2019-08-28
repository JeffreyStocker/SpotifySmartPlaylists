import React from 'react';
import axios from 'axios';

const link = `https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.SPOTIFY_REDIRECT}`;

export default class Login extends React.Component {
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
        debugger;
        if (response.status === 200) {
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