import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

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

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const userID = localStorage.getItem('userID');
    if (cookie.get('koa:sess') && userID) {
      axios.get(`/user/${userID}`)
        .then(({data: {name, accessToken, smartPlaylists, id, accessTokenExpire}}) => {
          this.props.setUser({name, id, accessToken, accessTokenExpire});
          this.props.setAllPlaylists(smartPlaylists);
        })
    }
  }

  render () {
    return (
      <Router>
        <Container>
          <Menu></Menu>
          {!this.props.user && <Message>Login To Continue</Message>}
          {this.props.user &&
            <Switch>
              <Route path="/smartplaylist" component={SmartPlaylists}></Route>
              <Route path="/sync" component={ShowSync}></Route>
              <Route path="/playlist" component={ListPlaylists}></Route>
            </Switch>
          }
        </Container>
      </Router>
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