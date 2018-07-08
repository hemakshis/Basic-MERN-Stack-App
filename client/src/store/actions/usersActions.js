import * as actionTypes from './actionTypes'

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

export const undoRedirect = () => {
    return {
        type: actionTypes.UNDO_REDIRECT
    }
}