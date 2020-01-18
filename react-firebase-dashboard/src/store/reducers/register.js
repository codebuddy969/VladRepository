const initialState = {
    register: 'login'
}

function registerReducer (state = initialState, action) {

    switch (action.type) {
        case "ACTION_REGISTER":
            return {...state, register: action.payload};
        default:
            return state
    }
}

export default registerReducer;