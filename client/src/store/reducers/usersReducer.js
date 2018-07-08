import * as actionTypes from '../actions/actionTypes'

const initialState = {
    addedUser: false,
    errorAddingUser: false
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
        case actionTypes.UNDO_REDIRECT:
            return {
                ...state,
                addedUser: false,
                errorAddingUser: false
            }
        default:
            return state;
    }
};

export default reducer;
