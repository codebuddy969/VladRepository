function faqReducer (state = null, action) {
  switch (action.type) {
    case 'TRIGGER_FAQ':
      if (action.payload === state.itemActive) {
        return {...state, itemActive: null}
      }
      return {...state, itemActive: action.payload}
    default:
      return state
  }
}

export default faqReducer
