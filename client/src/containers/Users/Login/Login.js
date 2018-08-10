import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLoginRequest } from '../../../store/actions/usersActions';

import InputField from '../../../components/InputField/InputField';

class Login extends Component {

    state = {
        userDetails: {},
        errors: {}
    }

    componentDidUpdate() {
        if (this.props.loginSuccessful) {
            this.props.history.push('/');
        }
    }

    handleValidation = (field, value) => {
        let errors = {...this.state.errors};

        if (value === '') {
            errors = {
                ...errors,
                [field]: 'This field is required'
            }
        } else {
            delete errors[field];
        }

        if (Object.keys(errors).length !== 0) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    userDetails: {...prevState.userDetails},
                    errors: {
                        ...errors
                    }
                };
            });
        } else {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    userDetails: {...prevState.userDetails},
                    errors: {}
                }; 
            })
        }
    }

    handleInputChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        
        this.setState((prevState) => {
            return {
                ...prevState,
                userDetails: {
                    ...prevState.userDetails,
                    [field]: value
                }
            };
        });

        this.handleValidation(field, value);
    }

    handleLogin = (e) => {
        e.preventDefault();
        if (Object.keys(this.state.errors).length !== 0){
            return;
        } else {
            let errors = {...this.state.errors};
            if (! this.state.userDetails.username) {
                errors = {
                    ...errors,
                    'username': 'This field is required'
                }
            }
            if (! this.state.userDetails.password) {
                errors = {
                    ...errors,
                    'password': 'This field is required'
                }
            }
            if (Object.keys(errors).length !== 0) {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        userDetails: {...prevState.userDetails},
                        errors: {...prevState.errors, ...errors}
                    }
                });
                return;
            } else {
                this.props.userLoginRequest(this.state.userDetails)
                
            }
        }
    }

    render() {
        return (
            <div className="container">
                <br />
                <h3 className="text-center">Login</h3>
                <div className="jumbotron">
                    {this.props.errors.invalidCredentials && <p style={{color: 'red'}}>{this.props.errors.invalidCredentials}</p>}
                    <form onSubmit={this.handleLogin}>
                        <InputField type="text" name="username" label="Username" errors={this.state.errors} onChange={this.handleInputChange} />
                        <InputField type="password" name="password" label="Password" errors={this.state.errors} onChange={this.handleInputChange} />
                        <button className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        errors: state.users.loginErrors,
        loginSuccessful: state.users.loginSuccessful
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userLoginRequest: (userLoginDetails) => dispatch(userLoginRequest(userLoginDetails))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);