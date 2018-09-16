import * as actionTypes from '../actions/actionTypes'
import jwt from 'jsonwebtoken';

const initialState = {
    isAuthenticated: localStorage.getItem('jwtToken') === null ? false : true,
    authenticatedUsername: localStorage.getItem('jwtToken') === null ? '' : jwt.decode(localStorage.getItem('jwtToken')).username,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESSFUL:
            return {
                isAuthenticated: true,
                authenticatedUsername: action.authenticatedUsername,
            }
        case actionTypes.LOGOUT_USER: {
            return {
                isAuthenticated: false,
                authenticatedUsername: ''
            }
        }
        default:
            return state;
    }
};

export default reducer;
