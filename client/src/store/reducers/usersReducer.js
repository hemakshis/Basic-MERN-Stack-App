import * as actionTypes from '../actions/actionTypes'

const initialState = {
    addedUserSuccessfully: false,
    errorAddingUser: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADDED_USER:
        return {
            ...state,
            addedUserSuccessfully: true
        };
        case actionTypes.ERROR_ADDING_NEW_USER:
            return {
                ...state,
                errorAddingUser: action.errors
            };
        default:
            return state;
    }
};

export default reducer;
