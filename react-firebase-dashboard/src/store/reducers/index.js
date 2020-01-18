import { combineReducers } from 'redux'

import menu from './Sidebar/menu';
import linksReducer from './Sidebar/links';
import logReducer from './logout';
import registerReducer from './register';

export default combineReducers({
    menu,
    linksReducer,
    logReducer,
    registerReducer
})