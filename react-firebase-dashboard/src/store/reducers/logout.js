const initialState = {
    status: 'loggedin'
}

function logReducer (state = initialState, action) {

    switch (action.type) {
        case "ACTION_LOGOUT":
            return {...state, status: action.payload};
        default:
            return state
    }
}

export default logReducer;