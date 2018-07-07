import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { undoRedirectFromSignupToLogin } from '../../../store/actions/usersActions';

class Login extends Component {
    componentWillMount() {
        // this.props.undoRedirectFromSignupToLogin()
    }
    render() {
        return (
            <h3>Welcome to Login</h3>
        );
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         undoRedirectFromSignupToLogin: () => dispatch(undoRedirectFromSignupToLogin())
//     };
// };

// export default connect(null, mapDispatchToProps)(Login);
export default Login;