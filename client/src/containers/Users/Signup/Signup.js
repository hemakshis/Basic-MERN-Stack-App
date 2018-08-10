import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { validateUserInput, userSignupRequest } from '../../../store/actions/usersActions'
import InputField from '../../../components/InputField/InputField';

// Check if E-mail is Valid or not
const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const fields = [
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
                } else if (this.state.userDetails.confirmPassword && value !== this.state.userDetails.confirmPassword) {
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
            for (var i = 0; i < fields.length; i++ ) {
                if (this.state.userDetails[fields[i]] === '') {
                    errors = {
                        ...errors,
                        [fields[i].name]: 'This field is required'
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

    componentDidUpdate() {
        if (this.props.signupSuccessful) {
            this.props.history.push('/login');
        }
    }

    render() {    
        const inputFields = fields.map(field =>
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
        signupSuccessful: state.users.addedUser && !state.users.errorAddingUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        validateUserInput: (userInputDetails) => dispatch(validateUserInput(userInputDetails)),
        userSignupRequest: (userSignupDetails) => dispatch(userSignupRequest(userSignupDetails))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
