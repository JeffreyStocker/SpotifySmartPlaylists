import React from 'react';
import PropTypes from 'prop-types';
import {Button, Transition} from 'semantic-ui-react';

class ButtonConfirm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false,
    };
    this.handleFirstClick = this.handleFirstClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }
  handleFirstClick() {
    this.setState({clicked: true})
  }

  handleCancel() {
    this.setState({clicked: false});
  }

  handleConfirm() {
    this.props.handleChange();
  }

  render() {
    return (
      <Transition.Group animation='slide left' duration={500} >
        {this.state.clicked
        ?
          <Button.Group>
            <Button onClick={this.handleCancel}>Cancel</Button>
            <Button color='red' onClick={this.handleConfirm}>Delete</Button>
          </Button.Group>
        :
          <Button color='red' onClick={this.handleFirstClick}>Delete</Button>
      }
      </Transition.Group>
    );
  }
}

ButtonConfirm.propTypes = {
  handleChange: PropTypes.func
}

export default ButtonConfirm;