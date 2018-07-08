import React, { Component } from 'react';
import { connect } from 'react-redux';
import { undoRedirect } from '../../../store/actions/usersActions';

class Login extends Component {
    componentWillMount() {
        this.props.undoRedirect()
    }
    render() {
        return (
            <div className="container">
                <br />
                <h3 className="text-center">Login</h3>
                
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        undoRedirect: () => dispatch(undoRedirect())
    };
};

export default connect(null, mapDispatchToProps)(Login);