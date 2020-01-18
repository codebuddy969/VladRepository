const initialState = {
  toShowBurger: false
}

function responsiveReducer (state = initialState, action) {
  switch (action.type) {
    case 'SET_BURGER_VISIBILITY':
      return {...state, toShowBurger: action.payload}
    default:
      return state
  }
}

export default responsiveReducer
