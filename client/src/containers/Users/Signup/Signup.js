import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { validateUserInput, userSignupRequest } from '../../../store/actions/usersActions'
import InputField from '../../../components/InputField/InputField';

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
        redirect: false
    };

    handleValidation = (field, value) => {
        let errors = {...this.state.errors};

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
                } else if (this.state.userDetails.confirmPassword !== '' && value !== this.state.userDetails.confirmPassword) {
                    errors = {
                        ...errors,
                        confirmPassword: 'Passwords do not match'
                    }
                } else {
                    delete errors.password;
                    delete errors.confirmPassword;
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
        }

        if ((field === 'username' || field === 'email') && value !== '') {
            this.props.validateUserInput({field: field, value: value})
            .then(res => res.json())
            .then(data => {
                if (Object.keys(data).length !== 0) {
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
                        }
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

    handleSignup = (e) => {
        e.preventDefault();
        if (Object.keys(this.state.errors).length !== 0){
            return;
        }
        else {
            let errors = {...this.state.errors};
            const fields = ['name', 'email', 'username', 'password', 'confirmPassword'];
            for (var i = 0; i < fields.length; i++ ) {
                if (this.state.userDetails[fields[i]] === '') {
                    console.log(fields[i] + ' is empty');
                    errors = {
                        ...errors,
                        [fields[i]]: 'This field is required'
                    }
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
                this.props.userSignupRequest(this.state.userDetails);
            }
        }
    }

    render() {
        if (this.props.signupSuccessful) {
            return <Redirect to="/login" />;
        } else {
            return (
                <div className="container">
                    <br />
                    <h3 className="text-center">Join Our Community!</h3>
                    <div className="jumbotron">
                        <form onSubmit={this.handleSignup}>
                            <InputField type="text" name="name" label="Name"
                                errors={this.state.errors}
                                onChange={this.handleInputChange} />
                            <InputField type="text" name="username" label="Username"
                                errors={this.state.errors}
                                onChange={this.handleInputChange} />
                            <InputField type="email" name="email" label="Email Address"
                                errors={this.state.errors}
                                onChange={this.handleInputChange} />
                            <InputField type="password" name="password" label="Password"
                                errors={this.state.errors}
                                onChange={this.handleInputChange} />
                            <InputField type="password" name="confirmPassword" label="Confirm Password"
                                errors={this.state.errors}
                                onChange={this.handleInputChange} />
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
        signupSuccessful: state.users.addedUser && !state.users.errorAddingUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        validateUserInput: (userInputDetails) => dispatch(validateUserInput(userInputDetails)),
        userSignupRequest: (userSignupDetails) => dispatch(userSignupRequest(userSignupDetails))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
