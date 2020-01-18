const initialState = {
    opened: 'opened',
    active: 'activated'
}

function menu (state = initialState, action) {

    switch (action.type) {
        case "ACTION_MENU":
            return {...state, opened: action.payload};
        default:
            return state
    }
}

export default menu;