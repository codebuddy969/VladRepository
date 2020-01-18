import React, { Component } from 'react';

import { auth } from '../../../firebase';

import { withRouter } from 'react-router-dom';

const INITIAL_STATE = {
    username: '',
    email: '',
    pass1: '',
    pass2: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class RegisterContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {

        const { username, email, pass1 } = this.state;

        auth.doCreateUserWithEmailAndPassword(email, pass1).then(authUser => {
            this.setState(() => ({ ...INITIAL_STATE }));
            this.props.history.push("/");
        })
            .catch(error => {
            this.setState(byPropKey('error', error));
        });

        event.preventDefault();
    }

    render() {
                
        const { username, email, pass1, pass2, error } = this.state;
        
        const isInvalid =
              pass1 !== pass2 ||
              pass1 === '' ||
              email === '' ||
              username === '';

        return (
            <form className="page-login__form" onSubmit={this.onSubmit}>
               
                {error === null ? 
                    (<p className="page-login__info">Register new account</p>) : 
                    (<p className="page-login__info">{ error && <span>{error.message}</span> }</p>)
                }
                
                <input
                    value={username}
                    onChange={event => this.setState(byPropKey('username', event.target.value))}
                    type="text"
                    placeholder="Full Name"
                />
                <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    value={pass1}
                    onChange={event => this.setState(byPropKey('pass1', event.target.value))}
                    type="password"
                    placeholder="Password"
                />
                <input
                    value={pass2}
                    onChange={event => this.setState(byPropKey('pass2', event.target.value))}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button type="submit" disabled={isInvalid} className="button">Register</button>
            </form>
        )
    }
}

export default withRouter(RegisterContainer);