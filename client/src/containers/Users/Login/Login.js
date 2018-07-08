import React, { Component } from 'react';
import { connect } from 'react-redux';
import { undoRedirect } from '../../../store/actions/usersActions';

class Login extends Component {
    componentWillMount() {
        this.props.undoRedirect()
    }
    render() {
        return (
            <h3>Welcome to Login</h3>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        undoRedirect: () => dispatch(undoRedirect())
    };
};

export default connect(null, mapDispatchToProps)(Login);