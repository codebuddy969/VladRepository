function scrollReducer (state = null, action) {
  switch (action.type) {
    case 'SCROLL_TO_SECTION':
      if (action.payload > 0 && state.activeSection < state.sections.length - 1) {
        return { ...state, activeSection: state.activeSection + 1 }
      }
      if (action.payload < 0 && state.activeSection > 0) {
        return { ...state, activeSection: state.activeSection - 1 }
      }
      return state

    case 'UPDATE_TIME_SINCE_SCROLLED':
      return {...state, timeSinceScroll: action.payload}

    case 'CHANGE_ACTIVE_LINK':
      return {...state, activeSection: action.payload}

    case 'TRIGGER_IGNORE_SCROLL':
      return {...state, scrollIgnoreStatus: action.payload}

    default:
      return state
  }
}

export default scrollReducer
