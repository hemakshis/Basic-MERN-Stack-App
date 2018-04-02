import * as actionTypes from '../actions/actionTypes';

const initialState = {
    articles: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_ARTICLES:
            return {
                ...state,
                articles: action.articles
            };
        default:
            return state;
    }
};

export default reducer;
