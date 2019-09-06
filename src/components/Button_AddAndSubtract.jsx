import React from 'react';
import {Button, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function AddAndSubtrack ({
  increase = () => {},
  decrease = () => {},
  increaseEnabled = true,
  decreaseEnabled = true,
  icon = true
}) {

  return (
    <Button.Group>
      <Button icon={icon} disabled={!increaseEnabled} onClick={increase}><Icon name="plus circle" /></Button>
      <Button icon={icon} disabled={!decreaseEnabled} onClick={decrease}><Icon name="minus circle" /></Button>
    </Button.Group>
  )
}

AddAndSubtrack.propsTypes = {
  increase: PropTypes.function,
  decrease: PropTypes.function,
  increaseEnabled: PropTypes.boolean,
  decreaseEnabled: PropTypes.boolean,
  icon: PropTypes.boolean
}