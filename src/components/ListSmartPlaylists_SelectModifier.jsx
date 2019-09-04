import React from 'react';
import {Dropdown} from 'semantic-ui-react';

const modifiers = ['greater than', 'less than', 'equal to'].map(name => ({text: name, value: name, key: name}));

const conditions = {
  number: ['greater than', 'less than', 'equal to', 'not greater to', 'is between'],
  text: ['includes', 'does not include', 'is', 'is not', 'contains', 'does not contain', 'starts with', 'end with'],
  booleanText: ['is', 'is not'],
  boolean: ['is true', 'is not true']
}
const primary = [
  ['Author', conditions.text],
  ['Track', conditions.text],
  ['Album', conditions.text],
  ['Artist\'s Genre', conditions.text]
]


const target = {

}

export default class ListPlaylists_SelectModifier extends React.PureComponent{
  constructor(props) {
    super (props);
    this.state = {selected: null}
    this.onChangeSelected = this.onChangeSelected.bind(this)
  }

  onChangeSelected (evt) {
    this.setState({selected: evt.target.innerText});
  }

  render() {
    return (
      <Dropdown
        selection
        fluid
        placeholder="Select One"
        options={modifiers}
        value={this.state.selected}
        onChange={this.onChangeSelected}
      >
      </Dropdown>
    )
  }
}