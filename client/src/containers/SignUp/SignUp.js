import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userSignUpRequest } from '../../store/actions/usersActions'

class SignUp extends Component {
    state = {
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    };

    handleInputChange = (e) => {
        let formDetails = {...this.state};
        formDetails = {
            ...formDetails,
            [e.target.name]: e.target.value
        }
        this.setState({
            ...formDetails
        });
    }

    handleSignUpFormSubmit = (e) => {
        e.preventDefault();
        this.props.userSignUpRequest(this.state);
    }

    render() {
        if (this.props.added) {
            return <Redirect to="/login" />;
        } else {
            return (
                <div className="container">
                    <br />
                    <h3 className="text-center">Sign Up</h3>
                    <div className="jumbotron">
                        <form onSubmit={this.handleSignUpFormSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="name"
                                    onChange={this.handleInputChange}
                                    defaultValue=""
                                    className="form-control" placeholder="Your Name"/>
                            </div>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text" name="username"
                                    className="form-control" placeholder="Username"
                                    onChange={this.handleInputChange}
                                    defaultValue="" />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" name="email"
                                    className="form-control" placeholder="Email Address"
                                    onChange={this.handleInputChange}
                                    defaultValue="" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password"
                                    className="form-control" placeholder="Password"
                                    onChange={this.handleInputChange}
                                    defaultValue="" />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" name="confirmPassword"
                                    className="form-control" placeholder="Confirm Password"
                                    onChange={this.handleInputChange}
                                    defaultValue="" />
                            </div>
                            <button className="btn btn-primary">Sign Up</button>
                        </form>
                    </div>
                </div>
            );    
        }
    }
}

const mapStateToProps = state => {
    return {
        added: state.users.addedUserSuccessfully,
        errors: state.users.errorAddingUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userSignUpRequest: (userSignUpDetails) => dispatch(userSignUpRequest(userSignUpDetails))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
