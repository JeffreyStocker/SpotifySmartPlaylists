import React from 'react';
import {Dropdown, Input} from 'semantic-ui-react';

export default class Complex extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      options: [],
      search: '',
      value: [],
      isFetching: true,
      thenSet: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleVahandleAdditionlue = this.handleAddition.bind(this);
  }

  handleChange(evt, {value}) {
    this.setState({value: value});
    this.props.onChange(value);
  }

  handleAddition(evt, {value}) {
    this.setState((prevState) => ({
      options: [{ text: value, value, key: value }, ...prevState.options],
    }));
  }

  componentWillMount() {
    let timer = Date.now();
    console.log ('checkinit', typeof this.props.options, this.props.options);
    if (typeof this.props.options === 'function') {
      console.log ('check');
      this.props.options().then(data => {
        const genOptions = data.map(name => ({value: name, text: name, key: name}));
        this.setState({options: genOptions, isFetching: false});
        console.log (Date.now() - timer);
      });
    }
  }

  handleClick(evt, obj) {
    evt.persist();
    console.log (evt, obj);
  }

  processValue (value) {
    if (typeof value === 'string') {
      return [value];
    } else if (Array.isArray(value)) {
      return value;
    }
    throw new Error('value should a string or an array');
  }

  render () {
    const {
      state: {isFetching, options, value},
      props: {},
      handleChange
    } = this;

    return (
      <Dropdown
        value={value || []}
        onChange={handleChange}
        disabled={isFetching}
        loading={isFetching}

        allowAdditions
        fluid
        multiple
        search
        selection
        options={options}
        onAddItem={this.handleAddition}
      >
      </Dropdown>
    );
  }

}