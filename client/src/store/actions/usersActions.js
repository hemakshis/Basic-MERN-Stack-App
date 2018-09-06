import * as actionTypes from './actionTypes'
import jwt from 'jsonwebtoken';

const URL = "http://localhost:5000";
const options = data => {
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(data)
    };
};

export const checkUserUniqueness = ({ field, value }) => {
    return dispatch => {
        return fetch(URL + '/users/validate', options({ field, value }))
    }
}

export const userSignupRequest = (userSignupDetails) => {
    return dispatch => {
        return fetch(URL + '/users/signup', options(userSignupDetails))
    }
}

export const userLoginRequest = (userLoginDetails) => {
    return dispatch => {
        fetch(URL + '/users/login', options(userLoginDetails))
        .then(res => res.json())
        .then(response => {
            if (response.errors) {
                dispatch({ type: actionTypes.LOGIN_ERRORS, errors: response.errors });
            } else if (response.token) {
                const token = response.token;
                localStorage.setItem('jwtToken', token);
                dispatch({ type: actionTypes.LOGIN_SUCCESSFUL, loginSuccessful: true, authorizationToken: token })
            }
        })
    }   
}