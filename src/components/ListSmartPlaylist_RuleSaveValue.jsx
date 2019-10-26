import React from 'react';
import {Container, Search, Label, Icon} from 'semantic-ui-react';
import _debounce from 'lodash/debounce';
import _escapeRegExp from 'lodash/escapeRegExp';
import _filter from 'lodash/filter';

const initialState = { isLoading: false, results: [], value: '' };

class SearchableGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVals: [],
      isLoading: false,
      origFunc: null,
      value: '',
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentWillMount() {
    if (typeof this.props.options === 'function') {
      const timer = Date.now();
      this.setState({origFunc: this.props.options, isLoading: true});
      this.props.options().then(results => {
        const shapedResults = results.map (name => {
          return {title: name};
        });
        this.setState({searchVals: shapedResults, isLoading: false});
        console.log ('timer', Date.now() - timer);
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const timer = Date.now();

    if (prevProps.options !== this.props.options) {
      this.setState({origFunc: this.props.options, isLoading: true});
      this.props.options().then(results => {
        const shapedResults = results.map (name => {
          return {title: name};
        });
        this.setState({searchVals: shapedResults, isLoading: false});
        console.log ('timer', Date.now() - timer);
      });
    }

  }
  handleRemove(evt, index) {
    if (this.props.onChange && typeof this.props.onChange === 'function') {
      this.onChange(evt, this.props.options.splice(index, 1));
    }
  }

  handleAdd(evt, { result }) {
    this.setState({ value: result.title });
  }

  handleSearchChange (e, { value }) {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_escapeRegExp(this.state.value), 'i');
      const isMatch = (result) => re.test(result.title);
      const results = _filter(this.state.searchVals, isMatch);
      console.log(results);

      this.setState({
        isLoading: false,
        results: results,
      });
    }, 300);
  }

  render() {
    const {
      props: {values, showNoSearchResults},
      state: {isLoading, value, results},
      handleRemove,
      handleAdd,
      handleSearchChange
    } = this;

    return (
      <Container fluid>
        <Search
          fluid
          loading={isLoading}
          onResultSelect={handleAdd}
          showNoResults={showNoSearchResults}
          onSearchChange={_debounce(handleSearchChange, 500, {
            leading: true,
          })}

          results={results}
          value={value}
        ></Search>
        <Container>
          {values.map((name, index) => (
            <Label>{name}<Icon name='delete' onClick={(evt) => handleRemove(evt, index)} /></Label>
          ))}
        </Container>


      </Container>
    );
  }
}


export default SearchableGroup;