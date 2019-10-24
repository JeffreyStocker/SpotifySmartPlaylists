import React from 'react';
import {Dropdown, Input} from 'semantic-ui-react';

let timer;


export default class Complex extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      options: [],
      search: '',
      value: [],
      isFetching: true,
      thenSet: false
    }
    this.handleChange = this.handleChange.bind(this);
    // this.toggleValue = this.toggleValue.bind(this);
    this.toggleVahandleAdditionlue = this.handleAddition.bind(this);
  }

  handleChange(evt, {value}) {
    this.setState({value: value});
    this.props.onChange(value);
  }

  handleAddition(evt, {value}) {
    this.setState((prevState) => ({
      options: [{ text: value, value, key: value }, ...prevState.options],
    }))
  }

  // toggleValue(evt, obj) {
  //   const index = this.state.value.findIndex(name => name === obj.value);
  //   const value = this.state.value;

  //   if (index >= 0) {
  //     const valueAfterRemoval = [...value.slice(0, index), ...value.slice(index + 1)];
  //     this.setState({value: valueAfterRemoval})
  //   } else {
  //     value.push(obj.value);
  //     this.setState({value: value})
  //   }
  // }

  componentWillMount() {
    timer = Date.now();
    console.log ('checkinit', typeof this.props.options, this.props.options)
    if (typeof this.props.options === 'function') {
      console.log ('check')
      this.props.options().then(data => {
        const genOptions = data.map(name => ({value: name, text: name, key: name}))
        this.setState({options: genOptions, isFetching: false});
        console.log (Date.now() - timer);
      })
    }

    // if (this.props.options && this.props.options.isPromise() && !this.state.thenSet) {
    //   timer = Date.now();
    //   if (!this.props.options.isRejected()) {
    //     this.setState({thenSet: true})
    //     this.props.options.then(data => {
    //       const genOptions = data.map(name => ({value: name, text: name, key: name}))
    //       this.setState({options: genOptions, isFetching: false});
    //       console.log (Date.now() - timer);
    //     })
    //   }
    // }
  }

  handleClick(evt, obj) {
    evt.persist();
    console.log (evt, obj)
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
        // onClick={this.handleClick}
      >
      </Dropdown>
    )
  }

}

/*
        <Dropdown.Menu>
          <Input icon='search' iconPosition='left' className="search"></Input>
          <Dropdown.Divider></Dropdown.Divider>
          <Input placeholder="Regexp"></Input>
          <Dropdown.Header>Options</Dropdown.Header>
          <Dropdown.Menu
            scrolling
          >
            {
              options && options.map((name) => {
                return <Dropdown.Item onClick={this.toggleValue} selected key={name} value={name}>{name}</Dropdown.Item>
              })
            }
          </Dropdown.Menu>
        </Dropdown.Menu>

*/