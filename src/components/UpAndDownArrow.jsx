import React from 'react';
import {Icon} from 'semantic-ui-react';


export default function (props) {
  return (
    <React.Fragment>
      {props.isUp ? <Icon name="chevron down" /> : <Icon name="chevron up"/>}
    </React.Fragment>
  )
}