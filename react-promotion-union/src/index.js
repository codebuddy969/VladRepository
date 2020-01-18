import React from 'react'
import ReactDOM from 'react-dom'
import './index.styl'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'

const rootEl = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(
      <NextApp />,
      rootEl
    )
  })
}
