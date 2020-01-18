import React from 'react';

import { compose } from 'redux';
import { auth } from '../../../../firebase';

import { Redirect } from 'react-router'

const NavbarHOC = Component => class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hellp: 'hello',
            authUser: this.authUser.bind(this),
        };
    }
    
    authUser() {
        setTimeout(function(){
            auth.doSignOut();
        }, 1000);
    }

    render() {
        return (
            <Component {...this.props} {...this.state} />
        );
    }
}

export default NavbarHOC;