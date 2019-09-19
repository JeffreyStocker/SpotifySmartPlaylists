import React from 'react';
// import dexie from 'dexie'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Icon, Container, Step, Model} from 'semantic-ui-react';
import {syncDataFromSpotify} from '../utilites/syncDataFromSpotify';

const steps = ['Getting Liked Albums', 'Getting Liked Tracks', 'Getting Playlists', 'Processing Data', 'Adding To Database']

class ShowSync extends React.PureComponent {
  constructor(props) {
    super (props);
    this.state = {currentStep: 0};
    this.increaseSet = this.increaseStep.bind(this);
  }

  increaseStep() {
    this.setState((state) => {
      return {currentStep: state.currentStep + 1}
    });
  }

  componentDidMount () {
    syncDataFromSpotify(this.props.user.accessToken, this.increaseStep.bind(this));
  }

  handleClose () {

  }

  render () {
    return (
        <Container fluid>
          Syncing Data from spotify
          <Container fluid>
            <Step.Group vertical>
              {
                steps.map((name, index) => (
                  <Step completed={this.state.currentStep > index} key={name}>
                    <Icon name="sync"></Icon>
                    <Step.Content>
                      <Step.Title>{name}</Step.Title>
                    </Step.Content>

                  </Step>
                ))
              }
            </Step.Group>
          </Container>
        </Container>
    );
  }
}

ShowSync.propTypes = {
  user: PropTypes.object
}

const mapStoreToProps = function ({user}) {
  return {
    user
  }
}

export default connect(mapStoreToProps)(ShowSync);
