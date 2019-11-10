import React from 'react';
import {Container, Search, Label, Icon, Segment} from 'semantic-ui-react';
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
    this.handleSearchChange = this.handleSearchKeyPress.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.startSearch = this.startSearch.bind(this);

    this.debouncedSearch = _debounce(this.startSearch, 500, { leading: true });
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
    this.setState({value: ''})
    this.props.items.push(result);
    this.props.onChange && this.props.onChange(evt, this.props.items);
  }

  startSearch() {

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_escapeRegExp(this.state.value), 'i');
      const isMatch = (result) => re.test(result.title);
      const results = _filter(this.state.searchVals, isMatch);

      this.setState({
        isLoading: false,
        results: results,
      });
    }, 300);
  }

  handleInputUpdate(evt, {value}) {
    this.setState({ isLoading: true, value });
    this.debouncedSearch();
  }

  handleSearchKeyPress (evt) {
    if (evt.key === 'enter') {
      this.debouncedSearch.cancel();
      this.handleAdd(evt, {result: this.state.value});
    }
  }

  handleSearchPress(evt) {

  }

  render() {
    const {
      props: {items = []},
      state: {isLoading, value, results},
      handleRemove,
      handleAdd,
      handleSearchKeyPress,
      handleInputUpdate
    } = this;

    return (
      <Container fluid>
        <Search
          fluid
          className='searchBox'
          input={{fluid: true, onKeyPress: handleSearchKeyPress}} //makes parent search fluid, not in docs
          loading={isLoading}
          showNoResults={isLoading}
          onResultSelect={handleAdd}
          onSearchChange={handleInputUpdate}
          results={results}
          value={value}
        ></Search>

        <Container>
          {items.map((name, index) => (
            <Label>{name}<Icon name='delete' onClick={(evt) => handleRemove(evt, index)} /></Label>
          ))}
        </Container>


      </Container>
    );
  }
}


export default SearchableGroup;