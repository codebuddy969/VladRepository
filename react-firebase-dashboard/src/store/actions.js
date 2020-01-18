export const registerAction = (data) => {
    return {
        type: "ACTION_REGISTER",
        payload: data
    }
}

export const toggleSidebar = (data) => {
    return {
        type: "ACTION_MENU",
        payload: data
    }
}

export const LogoutAction = (data) => {
    return {
        type: "ACTION_LOGOUT",
        payload: data
    }
}

