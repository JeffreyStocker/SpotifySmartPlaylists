import React from 'react';
import {Dropdown} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const genOptions = function (options = []) {
  if (Array.isArray(options)) {
    return options.map(name => ({text: name, value: name, key: name}));
  }
  return [];
}

export default class ListPlaylists_SelectModifier extends React.PureComponent{
  constructor(props) {
    super (props);
    this.state = {selected: null}
    this.options = !props.options ? [] : genOptions(props.options);
    this.onChangeSelected = this.onChangeSelected.bind(this);
  }


  onChangeSelected (evt) {
    this.setState({selected: evt.target.innerText});
    this.props.onChange(evt, this.props, evt.target.innerText);
  }

  render() {
    return (
      <Dropdown
        selection
        fluid
        disabled={!this.options}
        placeholder="Select One"
        options={genOptions(this.props.options)}
        // options={this.options}
        value={this.props.value}
        onChange={this.onChangeSelected}
      >
      </Dropdown>
    )
  }
}

ListPlaylists_SelectModifier.propTypes = {
  // options: PropTypes.array,
  // value: PropTypes.string
}
