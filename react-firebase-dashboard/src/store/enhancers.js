export const Middleware = store => next => action => {
    if (action.type === 'ACTION_LOGOUT' && action.payload === 'loggedout') {
        
        store.dispatch({ type: 'ACTION_LOGOUT_BUTTON' });
        setTimeout(function(){ return next(action) }, 1000);
        setTimeout(() => store.dispatch({ type: 'ACTION_LOGIN_BUTTON'}), 1000);
        
    } else {
        return next(action);
    }
}