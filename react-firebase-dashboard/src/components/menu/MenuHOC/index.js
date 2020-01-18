import React from 'react';

const MenuHOC = Component => class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dashboard: '',
            users: '',
            tasks: '',
            activateDashboard: this.activateDashboard.bind(this),
            activateUsers: this.activateUsers.bind(this),
            activateTasks: this.activateTasks.bind(this)
        };
    }
    
    activateDashboard() {
        this.setState({dashboard: 'active'});
    }
    
    activateUsers() {
        this.setState({users: 'active'});
    }
    
    activateTasks() {
        this.setState({tasks: 'active'});
    }

    render() {
        return (
            <Component {...this.props} {...this.state} />
        );
    }
}


export default MenuHOC;