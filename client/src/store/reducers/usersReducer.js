import * as actionTypes from '../actions/actionTypes'

const initialState = {
    addedUser: false,
    errorAddingUser: false,
    loginErrors: '',
    loginSuccessful: false,
    isAuthenticated: false,
    authorizationToken: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADDED_USER:
            return {
                ...state,
                addedUser: true,
                errorAddingUser: false
            }
        case actionTypes.ERROR_ADDING_USER:
            return {
                ...state,
                addedUser: false,
                errorAddingUser: true
            }
        case actionTypes.ERROR_LOGGING_USER:
            return {
                ...state,
                loginErrors: action.errors
            }
        case actionTypes.LOGGEDIN_USER:
            return {
                ...state,
                loginSuccessful: action.loginSuccessful,
                isAuthenticated: action.loginSuccessful,
                authorizationToken: action.authorizationToken,
                loginErrors: ''
            }
        default:
            return state;
    }
};

export default reducer;
