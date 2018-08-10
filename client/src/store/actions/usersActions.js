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

export const validateUserInput = (userInputDetails) => {
    return dispatch => {
        return fetch(URL + '/users/validate', options(userInputDetails))
    }
}

export const userSignupRequest = (userSignupDetails) => {
    return dispatch => {
        fetch(URL + '/users/signup', options(userSignupDetails))
        .then(res => res.json())
        .then(result => {
            dispatch({type: actionTypes.ADDED_USER})
        })
        .catch(error => {
            dispatch({type: actionTypes.ERROR_ADDING_USER})
        })
    } 
}

export const userLoginRequest = (userLoginDetails) => {
    return dispatch => {
        fetch(URL + '/users/login', options(userLoginDetails))
        .then(res => res.json())
        .then(data => {
            if (data.errors) {
                console.log(data.errors);
                dispatch({type: actionTypes.ERROR_LOGGING_USER, errors: data.errors});
            } else if (data.token) {
                const token = data.token;
                localStorage.setItem('jwtToken', token);
                const username = jwt.decode(token);
                console.log(username);
                dispatch({type: actionTypes.LOGGEDIN_USER, loginSuccessful: true, username: token})
            }
        })
    }   
}