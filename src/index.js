import reactDOM from 'react-dom';
import React from 'react';
import App from './app.jsx';
import store from './store/store';
import { Provider } from 'react-redux'

reactDOM.render(<Provider store={store}>
    <App/>
  </Provider>, document.getElementById('app1'));