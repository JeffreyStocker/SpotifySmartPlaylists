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
    <Transition visible={isOpen}>
      <Container>
        <Checkbox label="Auto-Update"></Checkbox>
        <Input label="Track Limit" type="number" placeholder="crazy"></Input>
      </Container>
    </Transition>
  )
}

export default React.memo(PlaylistOptions);