import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { checkUserUniqueness, userSignupRequest } from '../../../store/actions/usersActions'
import InputField from '../../../components/InputField/InputField';

// Check if E-mail is Valid or not
const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const FIELDS = [
    {name: 'name', type: 'text', label: 'Name'},
    {name: 'username', type: 'text', label: 'Username'},
    {name: 'email', type: 'email', label: 'E-mail Address'},
    {name: 'password', type: 'password', label: 'Password'},
    {name: 'confirmPassword', type: 'password', label: 'Confirm Password'}
];

class Signup extends Component {
    state = {
        userDetails: {},
        errors: {}
    };

    handleValidation = (field, value) => {
        let errors = {};
        const stateErrors = {...this.state.errors};

        if (value === '') {
            errors = {
                [field]: 'This field is required'
            }
        } else {
            if (field === 'email' && !validateEmail(value)) {
                    errors = {
                        email: 'Not a valid Email'
                    }
            } else if (field === 'password') {
                if (value.length < 4) {
                    errors = {
                        password: 'Password too short'
                    }
                } else if (this.state.userDetails.confirmPassword && value !== this.state.userDetails.confirmPassword) {
                    errors = {
                        confirmPassword: 'Passwords do not match'
                    }
                } else {
                    delete errors.confirmPassword;
                }
            } else if (field === 'confirmPassword' ) {
                if (value !== this.state.userDetails.password) {
                    errors = {
                        confirmPassword: 'Passwords do not match'
                    }
                }     
            }
        }

        if (!Object.keys(errors).includes(field) && Object.keys(this.state.errors).includes(field)) {
            delete stateErrors[field];
        }

        errors = {...stateErrors, ...errors};

        this.setState((prevState) => {
            return {
                ...prevState,
                userDetails: {...prevState.userDetails},
                errors: {
                    ...errors
                }
            };
        });
    }

    handleUserUniqueness = ({ field, value }) => {
        let errors = {...this.state.errors};
        this.props.checkUserUniqueness({ field, value })
        .then(res => res.json())
        .then(response => {
            if (response.errors) {
                errors = {...errors, ...response.errors};
            } else {
                delete errors[field];
            }
            this.setState(prevState => {
                return {
                    ...prevState,
                    userDetails: {...prevState.userDetails},
                    errors: {...errors}
                };
            });
        })
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

        if ((field === 'username' || field === 'email') && value !== '') {
            this.handleUserUniqueness({ field, value });
        }
    }

    handleSignup = (e) => {
        e.preventDefault();
        let errors = {...this.state.errors};
        if (Object.keys(errors).length > 0 ){
            return;
        }
        else {
                this.props.userSignupRequest(this.state.userDetails)
                .then(res => res.json())
                .then(response => {
                    if (response.errors) {
                        errors = {...errors, ...response.errors};
                    } else {
                        this.props.history.push('/login');
                    }
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            userDetails: {...prevState.userDetails},
                            errors: {...errors}
                        };
                    });
                })
            }
    }

    render() {    
        const inputFields = FIELDS.map(field =>
            <InputField key={field.name}
                        type={field.type} name={field.name} label={field.label}
                        errors={this.state.errors}
                        onChange={this.handleInputChange} />
        )
        return (
            <div className="container">
                <br />
                <h3 className="text-center">Join Our Community!</h3>
                <div className="jumbotron">
                    <form onSubmit={this.handleSignup}>
                        {inputFields}
                        <button className="btn btn-primary">Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        signupSuccessful: state.users.addedUser && state.users.errors === null,
        signupErrors: state.users.signupErrors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkUserUniqueness: (userInputDetails) => dispatch(checkUserUniqueness(userInputDetails)),
        userSignupRequest: (userSignupDetails) => dispatch(userSignupRequest(userSignupDetails))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
