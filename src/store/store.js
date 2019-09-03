const {createStore} = require ('redux');
const reducers = require ('./reducers/index.js')


const store = createStore(reducers)


module.exports = store;