import React from 'react';
import {Container, Grid, Card, Icon, Transition, Accordion, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {addRulePlaylist, removeRulePlaylist} from '../store/actions/smartPlaylists'

import SelectModifier from './ListSmartPlaylists_SelectModifier.jsx';
import Options from './ListSmartPlaylists_Options.jsx';
import UpAndDownArrow from './UpAndDownArrow.jsx'
import AddAndSubract from './Button_AddAndSubtract.jsx';




class Playlist_Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOptions: false,
      isVisibleRules: true
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleIsVisibleRuleChange = this.handleIsVisibleRuleChange.bind(this);
    this.handleAddRule = this.handleAddRule.bind(this);
    this.handleRemoveRule = this.handleRemoveRule.bind(this);

    // this.handleAddPlaylist = this.handleAddPlaylist.bind(this);
    // this.handleRemovePlaylist = this.handleRemovePlaylist.bind(this);
    // this.handleUpdatePlaylist = this.handleUpdatePlaylist.bind(this);
  }

  handleOptionChange() {
    this.setState({displayOptions: !this.state.displayOptions})
  }

  handleIsVisibleRuleChange() {
    this.setState({isVisibleRules: !this.state.isVisibleRules})
  }

  handleAddRule (evt, index) {
    this.props.addRulePlaylist(this.props.playlist, index);
  }

  handleRemoveRule (evt, index) {
    this.props.removeRulePlaylist(this.props.playlist, index);
  }


  handleCardClick(evt) {
    // evt.persist();
    // evt.stopPropagation()
    // evt.preventDefault(),
    console.log (evt);
    this.handleIsVisibleRuleChange()

  }

  render () {

    const {
      state: { isVisibleRules, displayOptions },
      props: { playlist, index, addPlaylist },
      handleAddRule,
      handleCardClick
    } = this;

    // const {
    //   playlist,
    //   index,
    //   addPlaylist,
    // } = this.props;

    // const {
    //   isVisibleRules,
    //   displayOptions,
    //   handleCardClick
    // } = this.state;

    return (
      <Transition>
        <Grid container columns={7}>
          <Grid.Row>
            <Grid.Column width={2} onClick={(evt) => handleAddRule(evt, -1, playlist)} verticalAlign="middle">
              <Button>Add Rule</Button>
            </Grid.Column>
            <Grid.Column width={4}>Primary</Grid.Column>
            <Grid.Column width={4}>Conditions</Grid.Column>
            <Grid.Column width={6}>Target</Grid.Column>
          </Grid.Row>

          {playlist.rules.map(rule => (
            <Grid.Row key={Math.random()}>
              {/* <Grid.Column width={1} verticalAlign="middle"><Icon size="large" name="minus circle"/></Grid.Column> */}
              <Grid.Column width={2} verticalAlign="middle">
                <AddAndSubract
                  increase={(evt) => this.handleAddRule(evt, index)}
                  decrease={(evt) => this.handleRemoveRule(evt, index)}
                />
              </Grid.Column>
              <Grid.Column width={4}><SelectModifier/></Grid.Column>
              <Grid.Column width={4}><SelectModifier/></Grid.Column>
              <Grid.Column width={6}><SelectModifier/></Grid.Column>
            </Grid.Row>
          ))}

          <Grid.Row>
            <Grid.Column width={4}>
              <Accordion onClick={this.handleOptionChange}>
                <Accordion.Content>
                  <UpAndDownArrow isUp={displayOptions}/> Options
                </Accordion.Content>
              </Accordion>
            </Grid.Column>
            <Options isOpen={this.state.displayOptions}></Options>
          </Grid.Row>
        </Grid>
      </Transition>
    )
  }
}

/*
<Card fluid>
        <Card.Content>
          <Card.Header onClick={this.handleIsVisibleRuleChange}><div onClick={this.handleIsVisibleRuleChange}>{playlist.name}<UpAndDownArrow isUp={isVisibleRules}/></div></Card.Header>

        </Card.Content>
      </Card>
*/

const mapDispatchToProps = {
  addRulePlaylist, removeRulePlaylist
};

export default connect(null, mapDispatchToProps)(Playlist_Item)