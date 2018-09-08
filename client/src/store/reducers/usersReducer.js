import * as actionTypes from '../actions/actionTypes'

const initialState = {
    isAuthenticated: false,
    authorizationToken: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESSFUL:
            return {
                ...state,
                isAuthenticated: true,
                authorizationToken: action.authorizationToken,
            }
        default:
            return state;
    }
};

export default reducer;
