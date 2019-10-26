import React, {useState} from 'react';
import {Modal, Button, Icon, Header, Input} from 'semantic-ui-react';

export default function PopOverRequest ({text = '', buttonText = 'Click Me', onChange = () => {}}) {
  const [isOpen, setOpen] = useState(false);
  const [newTitle, setTitle] = useState('');

  return (
    <Modal
    basic
    open={isOpen}
    trigger={<Button onClick={() => setOpen(true)}>{buttonText}</Button>}
    >
      <Header>{text}</Header>
      <Modal.Content>
        <Modal.Description>
          <Input
          fluid
          autoFocus
          focus
          onChange={(evt, data) => {evt.persist(); console.log(evt); setTitle(evt.target.value)}}
          placeholder={text}
          value={newTitle} />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => {
          setTitle('');
          setOpen(false);
        }}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='green' inverted onClick={() => onChange(newTitle)}>
          <Icon name='checkmark' /> Accept
        </Button>
      </Modal.Actions>
    </Modal>
  );
}