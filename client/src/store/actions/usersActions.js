import * as actionTypes from './actionTypes'

const URL = "http://localhost:5000";

export const userSignUpRequest = (userSignUpDetails) => {
    return dispatch => {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(userSignUpDetails)
        }
        fetch(URL + '/users/signup', options)
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    dispatch({type: actionTypes.ERROR_ADDING_NEW_USER, errors: data.errors})
                } else {
                    dispatch({type: actionTypes.ADDED_USER, success: true})
                }
            })
    }
}
