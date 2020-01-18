function sectionsReducer (state = null, action) {
  switch (action.type) {
    case 'CHANGE_ACTIVE_LINK': {
      let newState = [ ...state ]
      for (let i = 0; i < newState.length; i++) {
        if (i === action.payload) {
          newState[i].active = true
        } else {
          newState[i].active = false
        }
      }
      return newState
    }
    case 'SCROLL_TO_SECTION': {
      const newState = [...state]
      if (action.payload > 0) {
        for (let i = 0; i < state.length; i++) {
          const el = newState[i]
          if (el.active && i !== state.length - 1) {
            newState[i].active = false
            newState[i + 1].active = true
            return newState
          }
        }
      }
      if (action.payload < 0) {
        for (let i = 0; i < state.length; i++) {
          const el = newState[i]
          if (el.active && i !== 0) {
            newState[i].active = false
            newState[i - 1].active = true
            return newState
          }
        }
      }
      return newState
    }
    default:
      return state
  }
}

export default sectionsReducer
