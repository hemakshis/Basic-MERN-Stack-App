import * as actionTypes from '../actions/actionTypes'

const initialState = {
    validationErrors: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.VALIDATION_ERRORS:
            return {
                ...state,
                validationErrors: action.validationErrors
            }
        default:
            return state;
    }
};

export default reducer;
