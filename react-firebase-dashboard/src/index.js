import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducers/';

import { BrowserRouter } from 'react-router-dom';

const newStore = createStore(reducer);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={newStore}>
            <App />
        </Provider>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
