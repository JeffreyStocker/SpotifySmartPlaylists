import React from 'react';
import {Container, Checkbox, Transition, Input} from 'semantic-ui-react';

const PlaylistOptions = function PlaylistOptions (props) {
  const {
    isOpen = false,
    options = {
      autoUpdate: false
    }
  } = props;
  return (
      <Container>
        <Checkbox label="Auto-Update"></Checkbox>
        <Input label="Track Limit" type="number" placeholder="crazy"></Input>
      </Container>
  )
}

export default React.memo(PlaylistOptions);

/*
    <Transition visible={isOpen}>
    </Transiion>
t
 */