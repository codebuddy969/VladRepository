import React from 'react';
import './index.css';

import { Link } from 'react-router-dom';

import NavbarHOC from './NavbarHOC/index';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleSidebar, LogoutAction } from '../../../store/actions';

const Navbar = (props) => {
    
    const { toggleSidebar, LogoutAction } = props;
    const { opened } = props.menu;
    const { status } = props.logReducer;

    return (
        <div className='navbar'>
            <div className="column notifications">
                <div className="menu-burger">
                    <div 
                        className={`menu-burger__block ${opened === 'opened' ? 'activated' : 'disabled' }`} 
                        onClick={()=> {opened === 'opened' ? toggleSidebar('closed') : toggleSidebar('opened')}}>
                        <div className="menu-burger__line"></div>
                        <div className="menu-burger__line"></div>
                        <div className="menu-burger__line"></div>
                    </div>
                </div>
                <div className="bell" onClick={props.testing}>
                    <div className="bell__label"><span>2</span></div>
                    <div className="bell__context">
                        <div className="row">

                            <div className="row__message">
                                <a href="" className="title">User Agata has replied to your comment</a>
                                <div className="date">2 / 28 / 2018 <span>8:32</span></div>
                            </div>                           
                        </div>
                        <div className="row">
                            <div className="row__message">
                                <a href="" className="title">You have edited User Agata comment succesfuly</a>
                                <div className="date">2 / 28 / 2018 <span>8:31</span></div>
                            </div>                           
                        </div>
                        <div className="button">Show all</div>
                    </div>
                </div>
                <div className="letter">
                    <div className="letter__label"><span>5</span></div>
                    <div className="letter__context">
                        <div className="row">
                            <div className="row__photo">
                                <img src={require('../../../assets/images/email-user.png')} alt=""/>
                            </div>
                            <div className="row__message">
                                <a href="" className="title">How is the weather</a>
                                <div className="date">2 / 28 / 2018 <span>8:32</span></div>
                                <div className="text">Lorem ipsum dolor sit amet amet</div>
                            </div>                           
                        </div>
                        <div className="row">
                            <div className="row__photo">
                                <img src={require('../../../assets/images/email-user.png')} alt=""/>
                            </div>
                            <div className="row__message">
                                <a href="" className="title">How is the weather</a>
                                <div className="date">2 / 28 / 2018 <span>8:32</span></div>
                                <div className="text">Lorem ipsum dolor sit amet amet</div>
                            </div>                           
                        </div>
                        <div className="button">Show all</div>
                    </div>
                </div>
            </div>

            <div className="column logout">
                <div className="logout__message-container">

                    <div className="logout__message">
                        <span>Welcome back {props.hellp}<strong>Vlad</strong></span>
                    </div>
                    <div className="logout__switcher">
                        <div className="switcher-line">
                            <span className={`${status}`}>{status === 'loggedin' ? 'logout' : 'login'}</span>
                        </div>
                        <div onClick={props.authUser}>logout</div>
                        <div onClick={()=> { status === "loggedout" ? LogoutAction('loggedin') : LogoutAction('loggedout') }} className={`switcher-button ${status}`}>
                        </div>
                    </div>
                </div>
                <div className="logout__icon-container">
                    <div className="logout__icon-block">
                        <img src={require('../../../assets/images/icons/user.svg')} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )    
}


const mapStateToProps = (state) => {
    return {
        menu: state.menu,
        logReducer: state.logReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        toggleSidebar: bindActionCreators(toggleSidebar, dispatch),
        LogoutAction: bindActionCreators(LogoutAction, dispatch)
    }
}

export default NavbarHOC(connect(mapStateToProps, mapDispatchToProps)(Navbar));