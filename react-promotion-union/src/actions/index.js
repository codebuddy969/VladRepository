import axios from 'axios'

export function changeActiveLink (index) {
  return {
    'type': 'CHANGE_ACTIVE_LINK',
    'payload': index
  }
}

export function scrolled (event) {
  return {
    'type': 'SCROLL_TO_SECTION',
    'payload': event
  }
}

export function updateTimeSinceScrolled (time) {
  return {
    'type': 'UPDATE_TIME_SINCE_SCROLLED',
    'payload': time
  }
}

export function triggerFaq (id) {
  return {
    'type': 'TRIGGER_FAQ',
    'payload': id
  }
}

export function triggerIgnoreScroll (ignoreStatus) {
  return {
    'type': 'TRIGGER_IGNORE_SCROLL',
    'payload': ignoreStatus
  }
}

export function addPrice (price) {
  return {
    'type': 'ADD_PRICE',
    'payload': price
  }
}

export function substractPrice (price) {
  return {
    'type': 'SUBSTRACT_PRICE',
    'payload': price
  }
}

export function setBurgerVisibility (status) {
  return {
    'type': 'SET_BURGER_VISIBILITY',
    'payload': status
  }
}

export function checkHash (hash) {
  return {
    'type': 'CHECK_HASH',
    'payload': hash
  }
}

export function fetchBannerFormData (url) {
  return {
    'type': 'FETCH_BANNER_FORM_DATA',
    'payload': axios.get(url).then(wait(4000))
  }
}

export function toggleBurger (state) {
  return {
    'type': 'TOGGLE_BURGER',
    'payload': state
  }
}

// simulate delay
function wait (ms) {
  return function (x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms))
  }
}
