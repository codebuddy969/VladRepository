const initialState = {
    dashboard: '',
    users: '',
    tasks: ''
}

function linksReducer (state = initialState, action) {

    switch (action.type) {
        case "ACTION_DASHBOARD_LINK":
            return {...state, dashboard: action.payload, users: '', tasks: ''};
        case "ACTION_USERS_LINK":
            return {...state, dashboard: '', users: action.payload, tasks: ''};
        case "ACTION_TASKS_LINK":
            return {...state, dashboard: '', users: '', tasks: action.payload};
        default:
            return state
    }
}

export default linksReducer;