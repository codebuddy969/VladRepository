import React, { Component } from 'react';

import { auth } from '../../../firebase';

import { withRouter } from 'react-router-dom';

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class LoginContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    
    onSubmit = (event) => {
        const { email, password } = this.state;

        auth.doSignInWithEmailAndPassword(email, password).then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            this.props.history.push("/admin/dashboard");
        })
            .catch(error => {
            this.setState(byPropKey('error', error));
        });

        event.preventDefault();
    }
    
    render() {
        
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';
        
        return (
            <form className="page-login__form" onSubmit={this.onSubmit}>                
                {error === null ? 
                    (<p className="page-login__info">Please login to your account</p>) : 
                    (<p className="page-login__info">{ error && <span>{error.message}</span> }</p>)
                }
                <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    value={password}
                    onChange={event => this.setState(byPropKey('password', event.target.value))}
                    type="password"
                    placeholder="Password"
                />
                <button type="submit" disabled={isInvalid} className="button">Login</button>
            </form>
        )
    }
}

export default withRouter(LoginContainer);