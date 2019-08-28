import React from 'react';
import Menu from './components/Menu.jsx';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>
        <Menu></Menu>
      </div>
    );
  }
}