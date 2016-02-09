// Based off of: https://github.com/rackt/redux/blob/master/examples/real-world/store/configureStore.prod.js

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const finalCreateStore = compose(
  applyMiddleware(thunk),
)(createStore)

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState)
}
