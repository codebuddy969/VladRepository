import React from 'react';

import { compose } from "redux";
import { connect } from 'react-redux';

const MyHOC = Component => class extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            data: ""
        }
    }

    componentDidMount() {
        this.setState({
            data: this.props.menu.opened
        });
    }

    render() {
        return <Component {...this.props} {...this.state} />;
    }
};


const mapStateToProps = (state) => {
    return {
        menu: state.menu,
        logReducer: state.logReducer
    }
}

const composedHoc = compose(connect(mapStateToProps), MyHOC);

export default composedHoc;