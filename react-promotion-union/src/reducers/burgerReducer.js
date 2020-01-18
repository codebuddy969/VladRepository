const initialState = false

function burgerReducer (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_BURGER':
      return action.payload
    default:
      return state
  }
}

export default burgerReducer
