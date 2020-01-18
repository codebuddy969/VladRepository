import {createStore, applyMiddleware} from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import {composeWithDevTools} from 'redux-devtools-extension'

const preloadedState = {
  sections: [
    {
      name: 'Home',
      href: 'topSection',
      active: true
    },
    {
      name: 'Partners',
      href: 'partners',
      active: false
    },
    {
      name: 'How it works',
      href: 'how-it-works',
      active: false
    },
    {
      name: 'Banner size',
      href: 'banner',
      active: false
    },
    {
      name: 'F.A.Q',
      href: 'faq',
      active: false
    },
    {
      name: 'Contact us',
      href: 'contact',
      active: false
    }
  ],
  position: {
    activeSection: 0,
    sections: ['topSection', 'partners', 'how-it-works', 'banner', 'faq', 'contact'],
    timeSinceScroll: 0,
    scrollIgnoreStatus: false
  },
  faq: {
    length: 0,
    itemActive: null
  }
}

export default createStore(reducer, preloadedState, composeWithDevTools(
  applyMiddleware(promiseMiddleware(), thunk)
))
