import React from 'react';
import './index.css';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';
import { DashboardAction, UsersAction, TasksAction } from '../../store/actions/sidebar';

import MenuHOC from './MenuHOC/index';

const Menu = (props) => {
    
    const { menu, linksReducer, DashboardAction, UsersAction, TasksAction } = props;

    return (
        <div className={`menu ${menu.opened}`}>
            <div className="menu__logo">
                <span>React</span> Dashboard <strong>Project</strong>
            </div>
            <nav>
                <ul>
                    <li className={`${linksReducer.dashboard}`} onClick={()=> {DashboardAction()}}>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li className={`${linksReducer.users}`} onClick={()=> {UsersAction()}}>
                        <Link to="/admin/users">Users & activity</Link>
                    </li>
                    <li className={`${linksReducer.tasks}`} onClick={()=> {TasksAction()}}>
                        <Link to="/admin/tasks">Tasks & managment</Link>
                    </li>
                    <li>
                        <Link to="/" onClick={()=> {TasksAction()}}>Logout</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        menu: state.menu,
        linksReducer: state.linksReducer
    }
}

const mapDispatchToProps = dispatch => {
    return { 
        DashboardAction: bindActionCreators(DashboardAction, dispatch),
        UsersAction: bindActionCreators(UsersAction, dispatch),
        TasksAction: bindActionCreators(TasksAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuHOC(Menu));