import React from 'react';
import {Container, Grid, Button, Icon, Input, Item} from 'semantic-ui-react';

import SelectModifier from './ListSmartPlaylists_SelectModifier.jsx';
import Options from './ListSmartPlaylists_Options.jsx';


export default class Playlist_Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOptions: false
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange() {
    this.setState({displayOptions: !this.state.displayOptions})
  }

  render () {
    const {
      playlist = [],
      addPlaylist = () => {},
      removePlaylist = () => {},
    } = this.props;

    return (
      <Grid container columns={7}>
        <Grid.Row>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={4}>Primary</Grid.Column>
          <Grid.Column width={4}>Conditions</Grid.Column>
          <Grid.Column width={7}>Target</Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={1} verticalAlign="middle"><Icon size="large" name="minus circle"/></Grid.Column>
          <Grid.Column width={4}><SelectModifier/></Grid.Column>
          <Grid.Column width={4}><SelectModifier/></Grid.Column>
          <Grid.Column width={7}><SelectModifier/></Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column verticalAlign="middle" stretched width={1}><Icon size="large" name="plus circle"></Icon></Grid.Column>
          <Grid.Column width={4}>
            <Container onClick={this.handleOptionChange}>
              Options {this.state.displayOptions ? <Icon name="chevron down"></Icon> : <Icon name="chevron up"></Icon>}
            </Container>
          </Grid.Column>
          <Options isOpen={this.state.displayOptions}></Options>
        </Grid.Row>

        {/* <Grid.Row>
          <Grid.Column>
          </Grid.Column>
        </Grid.Row> */}
      </Grid>
    )
  }
}