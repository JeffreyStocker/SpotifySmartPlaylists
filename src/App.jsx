import cookie from'js-cookie';
import axios from 'axios';

import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Menu from './components/Menu.jsx';
import SmartPlaylists from './components/ListSmartPlaylists.jsx';
import { Container, Loader, Message, Segment, Dimmer } from 'semantic-ui-react';
import ListPlaylists from './components/ListPlaylists.jsx';
import ShowSync from './components/ShowSync.jsx';

import { HashRouter } from 'react-router-dom'

import {connect} from 'react-redux';
import {setUser} from './store/actions/user';
import {setAllPlaylists} from './store/actions/smartPlaylists';

const route = function (isLoaded, user) {
  if (isLoaded) {
    if (user.name === null) {
      return <Message>Login To Continue</Message>
    } else {
      return <Switch>
              <Route path="/smartplaylist" component={SmartPlaylists}></Route>
              <Route path="/sync" component={ShowSync}></Route>
              <Route path="/playlist" component={ListPlaylists}></Route>
            </Switch>
    }
  } {
    return <Segment style={{height: '100%'}}>
            <Dimmer active>
              <Loader>Loading User Data</Loader>
            </Dimmer>
          </Segment>
  }
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    const userID = localStorage.getItem('userID');
    if (cookie.get('koa:sess') && userID) {
      axios.get(`/user/${userID}`)
        .then(({data: {name, accessToken, smartPlaylists, id, accessTokenExpire}}) => {
          this.props.setUser({name, id, accessToken, accessTokenExpire});
          this.props.setAllPlaylists(smartPlaylists);
        })
        .catch(err => {
          console.err (err);
          this.props.setUser({
            name: null
          });
        })
        .then(() => {
          this.setState({isLoaded: true})
        })
    }
  }

  render () {
    return (
      <HashRouter>
        <Container>
          <Menu></Menu>
          {route(this.state.isLoaded, this.props.user)}
        </Container>
      </HashRouter>
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

/*
          {!this.props.user && <Message>Login To Continue</Message>}
          {this.props.user &&
            <Switch>
              <Route path="/smartplaylist" component={SmartPlaylists}></Route>
              <Route path="/sync" component={ShowSync}></Route>
              <Route path="/playlist" component={ListPlaylists}></Route>
            </Switch>
          }



*/