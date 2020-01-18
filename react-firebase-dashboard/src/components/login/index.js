import React from 'react';
import LoginContainer from './containers/login';
import RegisterContainer from './containers/register';
import './index.css';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux'
import { registerAction } from '../../store/actions';

const Login = (props) => {

    const { registerAction } = props;
    const { register } = props.registerReducer;

    return (
        <div className={`page-login ${register}`}>
            <h1 className="page-login__title">React <span>Dashboard</span></h1>
                        
            {register === 'register' ? <RegisterContainer /> : <LoginContainer /> }
            
            <div className="page-login__register" 
                 onClick={() => {register === 'register' ? registerAction('login') : registerAction('register')}}>{register === 'register' ? "Login" : "Register"}
            </div>     
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        logSwitch: state.logSwitch,
        registerReducer: state.registerReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        registerAction: bindActionCreators(registerAction, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));