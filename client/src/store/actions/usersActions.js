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
            // .then(res => res.json())
            // .then(data => {
            //     console.log('[IN DISPATCH]', data);
            //     dispatch({type: actionTypes.VALIDATION_ERRORS, validationErrors: data});
            // })
    }
}
