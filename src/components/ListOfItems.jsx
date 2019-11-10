import React from 'react';
import {Container, Search, Label, Icon, Segment} from 'semantic-ui-react';

export default function ListOfItems (props) {
  return (
    <Segment>
      <List horizontal ordered {...props}>
        {props.items.map((item, index) => (
          <List.Item key={item}>
            <Label onClick={(evt) => { props.onClick(evt, props, item, index); }}><Icon name='cancel' />{item}</Label>
          </List.Item>
        ))}
      </List>
    </Segment>
  );
}