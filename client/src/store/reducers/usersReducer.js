import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loginSuccessful: false,
    isAuthenticated: false,
    authorizationToken: '',
    loginErrors: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESSFUL:
            return {
                ...state,
                loginSuccessful: action.loginSuccessful,
                isAuthenticated: action.loginSuccessful,
                authorizationToken: action.authorizationToken,
                loginErrors: {}
            }
        case actionTypes.LOGIN_ERRORS:
            return {
                ...state,
                loginErrors: action.errors
            }
        default:
            return state;
    }
};

export default reducer;
