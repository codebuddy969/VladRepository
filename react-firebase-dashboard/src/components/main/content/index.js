import React from 'react';
import './index.css';

import Dashboard from './dashboard';
import Users from './users';
import Tasks from './tasks';

import { Route } from 'react-router-dom';

const Content = (props) => {
        
    return (
        <div className='content'>
            <Route path="/admin/dashboard" component={() => <Dashboard />} />
            <Route path="/admin/users" component={() => <Users />} />
            <Route path="/admin/tasks" component={() => <Tasks />} />
        </div>
    )
}

export default Content;
