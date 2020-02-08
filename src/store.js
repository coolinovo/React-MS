import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import Reducer from './reducers'

export default createStore(
  Reducer,
  applyMiddleware(thunk)
)