import { applyMiddleware, createStore, compose } from 'redux'
// redux-thunk middleware allows you to write action creators that return a function instead of an action.
// import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from '../reducers'

export default function configureStore(initialState) {
  let middleware

  if (process.env.NODE_ENV === 'production') {
    middleware = applyMiddleware()
  } else {
    middleware = applyMiddleware(/*thunk, */createLogger())
  }

  // Note: this API requires redux@>=3.1.0
  const store = createStore(rootReducer, initialState, compose(middleware))

  if (module.hot) {
    module.hot
    .accept('../reducers', () => {
      const nextRootReducer = require('../reducers')

      store.replaceReducer(nextRootReducer)
    })
  }

  return { store }
}
