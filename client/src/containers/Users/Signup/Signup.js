import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { validateUserInput } from '../../../store/actions/usersActions'
import ErrorMsg from '../../../components/ErrorMsg/ErrorMsg';
import './Signup.css';
import { POINT_CONVERSION_HYBRID } from 'constants';

// Check if E-mail is Valid or not
const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

class Signup extends Component {
    state = {
        userDetails: {
            name: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        errors: {},
        hasError: false,
        redirect: false
    };

    handleValidation = (field, value) => {
        let errors = {...this.state.errors};
        let hasError = true;

        if (value === '') {
            errors = {
                ...errors,
                [field]: 'This field is required'
            }
        } else {
            if (field === 'name' || field === 'username') {
                delete errors[field];
            } else if (field === 'email') {
                const isValid = validateEmail(value);
                if (!isValid) {
                    errors = {
                        ...errors,
                        email: 'Not a valid Email'
                    }
                } else {
                    delete errors.email;
                }
            } else if (field === 'password') {
                if (value.length < 4) {
                    errors = {
                        ...errors,
                        password: 'Password too short'
                    }
                } else {
                    delete errors.password;
                }
                
            } else if (field === 'confirmPassword' ) {
                if (value !== this.state.userDetails.password) {
                    errors = {
                        ...errors,
                        confirmPassword: 'Passwords do not match'
                    }
                } else {
                    delete errors.confirmPassword;
                }     
            }
            else {
                hasError = false;
            }
        }

        if ((field === 'username' || field === 'email') && value !== '') {
            this.props.validateUserInput({field: field, value: value})
            .then(res => res.json())
            .then(data => {
                if (Object.keys(data).length !== 0) {
                    hasError = true;
                    errors = {
                        ...errors,
                        ...data
                    }
                }
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        userDetails: {...prevState.userDetails},
                        errors: {
                            ...errors
                        },
                        hasError: true
                    };
                });
            })
        } else if (Object.keys(errors).length !== 0) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    userDetails: {...prevState.userDetails},
                    errors: {
                        ...errors
                    },
                    hasError: true
                };
            });
        }
        else if (Object.keys(errors).length === 0 && errors.constructor === Object ) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    userDetails: {...prevState.userDetails},
                    errors: {},
                    hasError: false
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

    handleSignupFormSubmit = (e) => {
        e.preventDefault();
        this.props.userSignupRequest(this.state.userDetails);
    }

    render() {
        const errors = {...this.state.errors};
        const hasError = this.state.hasError;
        const OnErrorClass = ['form-control', 'InputError'].join(' ');
        if (this.props.redirect) {
            return <Redirect to="/login" />;
        } else {
            return (
                <div className="container">
                    <br />
                    <h3 className="text-center">Join Our Community!</h3>
                    <div className="jumbotron">
                        <form onSubmit={this.handleSignupFormSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="name"
                                    className={hasError && errors.name ? OnErrorClass : 'form-control'}
                                    defaultValue="" placeholder="Your Name"
                                    onChange={this.handleInputChange} />
                                {hasError && errors.name ? <ErrorMsg msg={errors.name} /> : null}
                            </div>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text" name="username"
                                    className={hasError && errors.username ? OnErrorClass : 'form-control'}
                                    defaultValue="" placeholder="Username"
                                    onChange={this.handleInputChange} />
                                {hasError && errors.username ? <ErrorMsg msg={errors.username} /> : null}
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" name="email"
                                    className={hasError && errors.email ? OnErrorClass : 'form-control'}
                                    defaultValue="" placeholder="Email Address"
                                    onChange={this.handleInputChange} />
                                {hasError && errors.email ? <ErrorMsg msg={errors.email} /> : null}
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password"
                                    className={hasError && errors.password ? OnErrorClass : 'form-control'}
                                    defaultValue="" placeholder="Password"
                                    onChange={this.handleInputChange} />
                                {hasError && errors.password ? <ErrorMsg msg={errors.password} /> : null}
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" name="confirmPassword"
                                    className={hasError && errors.confirmPassword ? OnErrorClass : 'form-control'}
                                    defaultValue="" placeholder="Confirm Password"
                                    onChange={this.handleInputChange} />
                                {hasError && errors.confirmPassword ? <ErrorMsg msg={errors.confirmPassword} /> : null}
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
        errors: state.users.validationErrors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        validateUserInput: (userInputDetails) => dispatch(validateUserInput(userInputDetails))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
