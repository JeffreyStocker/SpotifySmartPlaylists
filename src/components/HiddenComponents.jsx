import React from 'react';
import {Transition} from 'semantic-ui-react';



export default class HiddenComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: props.initVisible === undefined ? props.initVisible : false,

    }
  }
  render () {
    <React.Fragment>
      {
        this.state.isVisible &&
        <Transition>
          this.props.children
        </Transition>
      }
    </React.Fragment>

  }
}