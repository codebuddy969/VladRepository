import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';

import { firebase } from './firebase';

import { Route } from 'react-router-dom';
import { withRouter } from 'react-router'

import Menu from './components/menu';
import Main from './components/main';
import Login from './components/login';
import DefaultPage from './components/404';

class App extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            path: "/",
            access: "denied",
            window: "blurred"
        }
    }

    componentDidMount() {
        
        firebase.auth.onAuthStateChanged(authorization => {
            if(authorization) {
                this.setState({ path: "/admin", access: "granted", window: "clean" });
            } else {
                this.setState({ path: "/", access: "denied", window: "blurred" });
            }
        });
    }
    
    anyRoute() {
        if(this.state.access === "denied" && this.props.location.pathname !== '/') {
            return <Route path='*' component={() => <DefaultPage />} />
        } else if ( this.state.access === "granted" && 
                    this.props.location.pathname !== '/' && 
                    this.props.location.pathname !== '/admin' &&
                    this.props.location.pathname !== '/admin/dashboard' && 
                    this.props.location.pathname !== '/admin/users' && 
                    this.props.location.pathname !== '/admin/tasks')
        { return <Route path='*' component={() => <DefaultPage />} /> }
    }
    
    render() {
        
        const { path, access } = this.state;
        
        return (
            <div className="App">
                <div className="video-background">
                    <div className={`video-background__wrapper ${this.state.window}`}>
                        <video src={require('./assets/city.mp4')} autoPlay muted loop></video>
                    </div>
                </div>
                <Route path={path} component={() => access === "granted" ? <Menu /> : null} />
                <Route path={path} component={() => access === "granted" ? <Main /> : null} />
                <Route exact path="/" component={() => <Login />} />
                {this.anyRoute()}
            </div>
        );
    }
}


export default withRouter(App);