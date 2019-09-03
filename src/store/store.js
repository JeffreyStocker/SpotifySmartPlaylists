const {createStore} = require ('redux');
const reducers = require ('./reducers/index.js')

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

module.exports = store;